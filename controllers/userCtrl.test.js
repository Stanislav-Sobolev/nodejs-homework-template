const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app");
const { User } = require("../models/userModel");
const request = require("supertest");
const jwt = require("jsonwebtoken");

const { PORT, DB_HOST_TEST } = process.env;

describe("test loginUser", function () {
  let server;
  beforeAll(() => (server = app.listen(PORT)));

  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  const newUser = {
    email: "rest@gmail.com",
    password: "test",
  };

  test("test signUp", async () => {
    const responseSignUp = await request(app)
      .post("/api/users/signup")
      .send(newUser);

    expect(responseSignUp.body.data.user.email).toBe(newUser.email);
    expect(responseSignUp.statusCode).toBe(201);
  });

  test("test logIn", async () => {
    const responseLogIn = await request(app)
      .post("/api/users/login")
      .send(newUser);

    expect(responseLogIn.statusCode).toBe(200);
    expect(typeof responseLogIn.body.data.user).toBe("object");
    expect(responseLogIn.body.data.user.email).toBe(newUser.email);
    expect(typeof responseLogIn.body.data.user.email).toBe("string");

    const user = await User.findOne({ email: newUser.email });

    const payload = {
      id: user._id,
      email: user.email,
    };

    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret);

    expect(responseLogIn.body.data.token).toBe(token);
    expect(responseLogIn.body.data.user.subscription).toBe(user.subscription);
    expect(typeof responseLogIn.body.data.user.subscription).toBe("string");
  });
});
