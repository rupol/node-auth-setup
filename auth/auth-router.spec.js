const supertest = require("supertest");
const server = require("../index");
const db = require("../data/config");

test("POST /register - register user route", async () => {
  await db("users").truncate();
  const res = await supertest(server)
    .post("/api/register")
    .send({ username: "ruth", password: "123abc" });

  // does it return the expected status code?
  expect(res.status).toBe(201);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.id).toBe(1);
  expect(res.body.username).toMatch(/ruth/i);
});

test("POST /login - login user route", async () => {
  const res = await supertest(server)
    .post("/api/login")
    .send({ username: "ruth", password: "123abc" });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.message).toMatch(/logged in/i);
  expect(res.body.user).toBe(1);
  expect(res.body.token).not.toBeNull();

  await db("users").truncate();
});
