import { writeFileSync } from "node:fs";

const fetchAndWriteOpenAPI = async () => {
  try {

    const server = process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://api.yzlab.ru";

    const path = "/openapi.json";
    const url = new URL(path, "http://localhost:3000");

    console.log(url.toString())

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Failed to fetch OpenAPI");
    const data = await response.json();
    writeFileSync("./api.json", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
};

fetchAndWriteOpenAPI();
