import { defaultUser } from "../../data/users";
import { endpoint } from "../endpoints";
import { HttpHeader, PostRequest } from "../http-request-commands";
import { defaultHttpHeaders } from "../shared/http-headers";

interface CreateUserHeader extends HttpHeader {
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

interface UserCreatedResponse extends User {
  id: number;
}

interface CreateUserData {
  headers: CreateUserHeader;
  data: User;
}

export const createUserRequest = (
  { headers, data }: CreateUserData = {
    data: defaultUser,
    headers: defaultHttpHeaders(),
  }
) =>
  new PostRequest<UserCreatedResponse>(endpoint.createUser(), {
    headers,
    data,
  });
