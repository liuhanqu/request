Request based on Fetch API

## Install

```
npm i @liuhanqu@request
```

## Usage

```js
import rf from '@liuhanqu/request';

async () => {
  const res = await rf.get('/some-api', {params: {foo: 'bar'}}).text();

  console.log(res);
};

async () => {
  const res = await rf.post('/some-api', {json: {foo: 'bar'}}).json();

  console.log(res);
};
```

## API

- rf(url: string, option: Option)

- rf.get(url, option)

- rf.post(url, option)

- rf.put(url, option)

- rf.delete(url, option)

- rf.patch(url, option)

```ts
interface Option {
  params?: Record<string, string>;
  json?: object;
  timeout?: number;

  method?: string;
  keepalive?: boolean;
  ...
  (same with fetch params)
}
```

## Differ with fetch

- request timeout, it will throw an TimeoutError

- response is not ok, it will throw an HTTPError

- auto add query to url when pass params

- auto set header when pass json
