import { endpoint } from "./endpoints";
import { GetRequest, HttpHeader, PostRequest } from "./http-request-commands";
import { defaultHttpHeaders } from "./shared/http-headers";

interface UsersHeader extends HttpHeader {
  "Content-Type": string;
  "X-Request-Id": string;
}

export interface User {
  name: string;
  age: number;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  preferences: {
    theme: string;
    notifications: boolean;
  };
}

interface UserResponse extends User {
  id: number;
}

interface CreateUserData {
  headers?: UsersHeader;
  data: User;
}

export const createUserRequest = ({ headers, data }: CreateUserData) =>
  new PostRequest<UserResponse>(endpoint.createUser(), {
    headers: headers ?? defaultHttpHeaders(),
    data,
  });

interface GetUserData {
  headers?: UsersHeader;
  id: number;
}

export const getUserRequest = ({ headers, id }: GetUserData) =>
  new GetRequest<UserResponse>(endpoint.getUser(id), {
    headers: headers ?? defaultHttpHeaders(),
  });
