import { Hono } from "hono";
import { createLinks, getRootLinks, getRootLinksWithOgs } from "./actions";



export const links = new Hono();

links.get("/sites", async (c) => {
  try {
    const links = await getRootLinks()
    return c.json(links, 200);
  } catch (error) {
    console.log(error)
    return c.json([], 200);
  }
});

links.get("/ogs", async (c) => {
  try {

    const links = await getRootLinksWithOgs()
    return c.json(links, 200);
  } catch (error) {
    console.log(error)
    return c.json([], 200);
  }
});


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
