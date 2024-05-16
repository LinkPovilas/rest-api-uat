import { User } from "../http-requests/users/create-user-request";

export const defaultUser: User = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "NY",
    zipcode: "12345",
  },
  preferences: {
    theme: "dark",
    notifications: true,
  },
};
