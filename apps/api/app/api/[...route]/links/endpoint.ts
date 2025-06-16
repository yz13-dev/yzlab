import { Hono } from "hono";
import { createLinks } from "./actions";



export const links = new Hono();



links.post("/", async (c) => {
  const links = c.req.query("links");
  const domain = c.req.query("domain");

  const linksArray = links ? links.split(",") : []

  if (!domain) {
    console.log("Domain not provided")
    return c.json(null, 200);
  }

  if (!linksArray.length) {
    console.log("No links provided")
    return c.json(null, 200);
  }

  const preparedLinks = linksArray.map((link) => {
    return {
      domain: link,
      pathname: link,
    }
  })

  const created = await createLinks(preparedLinks)

  return c.json(created, 200);
})
