const supertest = require("supertest");
const server = require("./index");

test("GET / - welcome route", async () => {
  const res = await supertest(server).get("/");

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.message).toMatch(/welcome to our api/i);
});

test("GET /test - route not found", async () => {
  const res = await supertest(server).get("/test");

  // does it return the expected status code?
  expect(res.status).toBe(404);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.message).toMatch(/route was not found/i);
});
