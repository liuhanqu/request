export interface Option extends RequestInit {
  json?: object;
  params?: Record<string, string>;
  timeout?: number;
}

class CustomError extends Error {
  constructor(name: string, msg: string, public response?: Response) {
    super(msg);
    this.name = name;
  }
}

function sleep(ms: number): Promise<string> {
  return new Promise(resolve => {
    setTimeout(resolve, ms, 'timeout');
  });
}

function race(p1: Promise<Response>, p2: Promise<string>) {
  return Promise.race([p1, p2]).then(res => {
    if (res === 'timeout') {
      throw new CustomError('TimeoutError', 'request timeout');
    }
    return res as Response;
  });
}

class Ajax {
  private response: Promise<Response>;

  constructor(url: string, option: Option = {}) {
    this.response = Promise.resolve().then(() => this.request(url, option));
  }

  private async request(url: string, option: Option) {
    const {json, params, timeout = 10 * 1000, ...opt} = option;

    const headers = new Headers(opt.headers);

    if (params) {
      const querystring = new URLSearchParams(params).toString();
      url = url + '?' + querystring;
    }

    if (json) {
      opt.body = JSON.stringify(json);
      headers.set('Content-Type', 'application/json');
    }

    opt.headers = headers;

    const res = await race(fetch(url, opt), sleep(timeout));

    if (!res.ok) {
      throw new CustomError('HTTPError', res.statusText, res);
    }

    return res.clone();
  }

  async json() {
    const res = await this.response;
    return res.json();
  }

  async text() {
    const res = await this.response;
    return res.text();
  }

  async blob() {
    const res = await this.response;
    return res.blob();
  }

  async formData() {
    const res = await this.response;
    return res.formData();
  }

  async arrayBuffer() {
    const res = await this.response;
    return res.arrayBuffer();
  }
}

const rf = (url: string, option: Option) => {
  return new Ajax(url, option);
};

type Func = {
  (url: string, option: Option): Ajax;
};

export interface RF {
  (url: string, option: Option): Ajax;
  get: Func;
  post: Func;
  delete: Func;
  put: Func;
  patch: Func;
}

['get', 'post', 'put', 'delete', 'patch'].forEach(verb => {
  (rf as any)[verb] = (url: string, option: Option) => {
    option.method = verb.toUpperCase();
    return new Ajax(url, option);
  };
});

export default rf as RF;
