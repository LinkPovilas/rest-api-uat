import { APIRequestContext } from "@playwright/test";
import type { HttpRequestCommand } from "../http-requests/http-request-commands";

export class Send {
  constructor(protected readonly context: APIRequestContext) {}

  a<T>(request: HttpRequestCommand<T>) {
    return request.execute(this.context);
  }
}
