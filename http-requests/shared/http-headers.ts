import { randomUUID } from "node:crypto";

export const defaultHttpHeaders = () => ({
  "X-Request-Id": randomUUID(),
  "Content-Type": "application/json",
});
