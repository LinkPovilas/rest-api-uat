import { APIRequestContext, APIResponse } from "@playwright/test";
import { ReadStream } from "fs";

type HttpMethod = "delete" | "get" | "patch" | "post" | "put";

export interface HttpHeader {
  [key: string]: string;
}

type HttpResponse<T> = Omit<APIResponse, "json"> & { json(): Promise<T> };

export interface Options {
  data?: string | Buffer | unknown;
  failOnStatusCode?: boolean;
  form?: { [key: string]: string | number | boolean };
  headers?: { [key: string]: string };
  ignoreHTTPSErrors?: boolean;
  maxRedirects?: number;
  multipart?:
    | FormData
    | {
        [key: string]:
          | string
          | number
          | boolean
          | ReadStream
          | {
              name: string;
              mimeType: string;
              buffer: Buffer;
            };
      };
  params?: { [key: string]: string | number | boolean };
  timeout?: number;
}

export abstract class HttpRequestCommand<T> {
  constructor(
    private readonly method: HttpMethod,
    private readonly url: string,
    private readonly options?: Options
  ) {}

  execute(context: APIRequestContext): Promise<HttpResponse<T>> {
    return context[this.method](this.url, this.options);
  }
}

export class DeleteRequest<T> extends HttpRequestCommand<T> {
  constructor(url: string, options?: Options) {
    super("delete", url, options);
  }
}

export class GetRequest<T> extends HttpRequestCommand<T> {
  constructor(url: string, options?: Options) {
    super("get", url, options);
  }
}

export class PatchRequest<T> extends HttpRequestCommand<T> {
  constructor(url: string, options?: Options) {
    super("patch", url, options);
  }
}

export class PostRequest<T> extends HttpRequestCommand<T> {
  constructor(url: string, options?: Options) {
    super("post", url, options);
  }
}

export class PutRequest<T> extends HttpRequestCommand<T> {
  constructor(url: string, options?: Options) {
    super("put", url, options);
  }
}
