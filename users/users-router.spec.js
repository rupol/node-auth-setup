const supertest = require("supertest");
const server = require("../index");
const db = require("../data/config");

test("GET / - get users (authenticated)", async () => {
  await db("users").truncate();

  // create user
  await supertest(server)
    .post("/api/register")
    .send({ username: "test", password: "123abc" });

  // login user
  const login = await supertest(server)
    .post("/api/login")
    .send({ username: "test", password: "123abc" });

  const token = login.body.token;

  const res = await supertest(server)
    .get("/api/users")
    .set("Authorization", token);

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.message).toBeUndefined();
});

test("GET / - get users (not authenticated)", async () => {
  const res = await supertest(server).get("/api/users");

  // does it return the expected status code?
  expect(res.status).toBe(401);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.message).toMatch(
    /user not authenticated. please log in and try again/i
  );

  await db("users").truncate();
});
