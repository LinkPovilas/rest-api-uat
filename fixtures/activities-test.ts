import { test as base } from "@playwright/test";
import { Send } from "../activities/Send";

interface Activity {
  send: Send;
}

export const test = base.extend<Activity>({
  send: async ({ request }, use) => {
    await use(new Send(request));
  },
});
export { expect } from "@playwright/test";
