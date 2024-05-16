import { defaultUser } from "../data/users";
import { expect, test } from "../fixtures/activities-test";
import { defaultHttpHeaders } from "../http-requests/shared/http-headers";
import { createUserRequest } from "../http-requests/users/create-user-request";

test.describe("Users", () => {
  test("should create a new user", async ({ send }) => {
    const newUser = await send.a(
      createUserRequest({
        headers: defaultHttpHeaders(),
        data: defaultUser,
      })
    );
    expect(newUser.ok()).toBeTruthy();
    expect(await newUser.json()).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      })
    );
  });
});
