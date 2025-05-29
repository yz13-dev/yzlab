import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const expire = {
  min: 60,
  fiveMin: 300,
  tenMin: 600,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2592000,
  year: 31536000,
};
