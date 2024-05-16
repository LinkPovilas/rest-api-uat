export const endpoint = {
  createUser: () => "http://localhost:3000/users",
  getUser: (id: number) => `http://localhost:3000/users/${id}`,
};
