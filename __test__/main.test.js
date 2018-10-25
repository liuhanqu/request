import util from 'util';
import rf from '../dist';
import createTestServer from 'create-test-server';
import body from 'body';
import delay from 'delay';

const pBody = util.promisify(body);

test('GET request', async () => {
  expect.assertions(1);

  const server = await createTestServer();
  server.get('/', (request, response) => {
    response.end(request.method);
  });

  const data = await rf.get(server.url).text();
  expect(data).toBe('GET');

  await server.close();
});

test('POST request', async () => {
  const server = await createTestServer();
  server.post('/', (request, response) => {
    response.end(request.method);
  });

  const data = await rf.post(server.url).text();
  expect(data).toBe('POST');

  await server.close();
});

test('PUT request', async () => {
  expect.assertions(1);

  const server = await createTestServer();
  server.put('/', (request, response) => {
    response.end(request.method);
  });

  const data = await rf.put(server.url).text();
  expect(data).toBe('PUT');

  await server.close();
});

test('PATCH request', async () => {
  expect.assertions(1);

  const server = await createTestServer();
  server.patch('/', (request, response) => {
    response.end(request.method);
  });

  const data = await rf.patch(server.url).text();
  expect(data).toBe('PATCH');

  await server.close();
});

test('DELETE request', async () => {
  expect.assertions(1);

  const server = await createTestServer();
  server.delete('/', (request, response) => {
    response.end(request.method);
  });

  const data = await rf.delete(server.url).text();
  expect(data).toBe('DELETE');

  await server.close();
});

test('POST JSON', async () => {
  expect.assertions(1);

  const json = {
    foo: true,
  };

  const server = await createTestServer();
  server.post('/', async (request, response) => {
    // response.json(JSON.parse(await pBody(request)));
    response.json(json);
  });

  let data = null;
  try {
    data = await rf.post(server.url, {json}).json();
  } catch (e) {
    console.log(e);
  }

  expect(data).toEqual(json);

  await server.close();
});

test('custom headers', async () => {
  expect.assertions(1);

  const server = await createTestServer();
  server.get('/', (request, response) => {
    response.end(request.headers.unicorn);
  });

  const data = await rf(server.url, {
    headers: {
      unicorn: 'fixture',
    },
  }).text();

  expect(data).toEqual('fixture');
  await server.close();
});

test('HttpErrors option', async () => {
  expect.assertions(1);

  const server = await createTestServer();
  server.get('/', (request, response) => {
    response.sendStatus(500);
  });

  try {
    await rf(server.url).text();
  } catch (e) {
    expect(e.name).toBe('HTTPError');
  }

  await server.close();
});

test('timeout option', async () => {
  expect.assertions(1);

  const server = await createTestServer();
  server.get('/', async (request, response) => {
    await delay(1000);
    response.end('fixture');
  });

  try {
    await rf(server.url, {timeout: 500}).text();
  } catch (e) {
    expect(e.name).toBe('TimeoutError');
  }

  await server.close();
});
