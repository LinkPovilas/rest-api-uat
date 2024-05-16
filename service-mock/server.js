const http = require("http");

const port = 3000;
const dataInMemory = [
  {
    id: 1,
    name: "Alice Smith",
    age: 25,
    email: "alice.smith@example.com",
    address: {
      street: "789 Elm St",
      city: "Sometown",
      state: "CA",
      zipcode: "67890",
    },
    preferences: {
      theme: "light",
      notifications: true,
    },
  },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Welcome to the server",
      })
    );
  } else if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const requestBody = JSON.parse(body);
      const id = dataInMemory.length + 1;
      const data = { id, ...requestBody };

      dataInMemory.push(data);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ...data,
        })
      );
    });
  } else if (req.method === "GET" && req.url.startsWith("/users/")) {
    const userId = parseInt(req.url.split("/")[2]);
    const user = dataInMemory.find((user) => user.id === userId);

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
