import { redis } from "@/extensions/redis";



export const getOgsCache = async () => {
  const matched = await redis.scan("0", {
    match: "sites:*"
  })

  const keys = matched[1];

  return keys;
}

export const getSitesCache = async () => {
  const matched = await redis.scan("0", {
    match: "ogs:*"
  })

  const keys = matched[1];

  return keys;
}

export const getLinksCache = async () => {
  const cache = await Promise.all([getOgsCache(), getSitesCache()])
  return cache.flat();
}

export const clearLinksCache = async () => {
  const cache = await getLinksCache()
  for (const key of cache) {
    await redis.del(key)
  }
}
