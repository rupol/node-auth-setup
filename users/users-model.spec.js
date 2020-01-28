const db = require("../data/config");
const usersModel = require("./users-model");

describe("users model", () => {
  test("add", async () => {
    await db("users").truncate();

    const res = await usersModel.add({
      username: "ruth",
      password: "123abc"
    });
    expect(res.id).toBe(1);
    expect(res.username).toMatch(/ruth/i);
    expect(res.password).not.toBeNull();

    const users = await db("users");
    expect(users).toHaveLength(1);
  });

  test("get", async () => {
    const res = await usersModel.get();
    expect(res).toHaveLength(1);
  });

  test("get with id", async () => {
    const res = await usersModel.get(1);
    expect(res.id).toBe(1);
    expect(res.username).toMatch(/ruth/i);
    expect(res.password).not.toBeNull();

    await db("users").truncate();
  });
});
