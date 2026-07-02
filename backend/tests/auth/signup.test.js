const request = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../../src/app");
const User = require("../../src/models/user.model");

describe("Signup API", () => {

  test("should register a new user successfully", async () => {

    const userData = {
      username: "vatsal",
      email: "vatsal@test.com",
      password: "Password123"
    };

    const response = await request(app)
      .post("/api/auth/signup")
      .send(userData);

    // 1. Check status code
    expect(response.statusCode).toBe(201);

    // 2. Check response
    expect(response.body).toHaveProperty("token");
    expect(response.body.username).toBe(userData.username);

    // 3. Check database
    const user = await User.findOne({ email: userData.email });

    expect(user).not.toBeNull();
    expect(user.username).toBe(userData.username);

    // 4. Password should NOT be stored as plain text
    expect(user.password).not.toBe(userData.password);

    // 5. Password hash should be valid
    const isMatch = await bcrypt.compare(
      userData.password,
      user.password
    );

    expect(isMatch).toBe(true);

  });

});