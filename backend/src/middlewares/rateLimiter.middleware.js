import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { rateLimit } from "../utils/upstash.js";

export const rateLimiter = asyncHandler(async (req, res, next) => {
  const { success } = await rateLimit.limit("my-limit-key");

  if (!success)
    throw new ApiError(429, "Too many requests, please try again later!");

  next();
});
