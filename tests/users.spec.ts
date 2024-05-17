import { defaultUser } from "../data/users";
import { expect, test } from "../fixtures/activities-test";
import {
  createUserRequest,
  getUserRequest,
} from "../http-requests/users-requests";

test.describe("Users", () => {
  test("should save a new user", async ({ send }) => {
    const response = await send.a(createUserRequest({ data: defaultUser }));
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody.id).toBeGreaterThanOrEqual(1);
    expect(responseBody).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...defaultUser,
      })
    );
  });

  test("should return a user", async ({ send }) => {
    const FIRST_USER = 1;
    const response = await send.a(getUserRequest({ id: FIRST_USER }));

    expect(await response.json()).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        age: expect.any(Number),
        email: expect.any(String),
        address: expect.objectContaining({
          street: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          zipcode: expect.any(String),
        }),
        preferences: expect.objectContaining({
          theme: expect.any(String),
          notifications: expect.any(Boolean),
        }),
      })
    );
  });
});
