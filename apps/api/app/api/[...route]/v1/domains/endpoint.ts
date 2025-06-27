import { Hono } from "hono";
import { getDomainByDomain, getDomains } from "./actions";


export const domains = new Hono();

domains.get("/", async (c) => {
  try {
    const data = await getDomains();

    return c.json(data);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
})

domains.get("/:domain", async (c) => {

  const domain = c.req.param("domain");

  try {

    const data = await getDomainByDomain(domain)

    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});
