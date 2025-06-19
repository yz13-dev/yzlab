"use server";

import { cookies } from "next/headers";
import { API_URL } from "./api";
import type { FetchResponse } from "./response";

// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return c.json();
  }

  if (contentType && contentType.includes("application/pdf")) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  const baseUrl = API_URL;

  const url = new URL(contextUrl, baseUrl);
  const pathname = url.pathname;
  const search = url.search;

  const requestUrl = new URL(`${pathname}${search}`, baseUrl);

  return requestUrl.toString();
};

// NOTE: Add headers
const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const cookieStore = await cookies();
  const str = cookieStore.toString();
  return {
    ...headers,
    Cookie: str,
  };
};

export const customFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<FetchResponse<T>> => {
  try {
    const header = options?.headers ?? {};
    const requestUrl = getUrl(url);
    const requestHeaders = await getHeaders(header);

    const requestInit: RequestInit = {
      ...options,
      headers: requestHeaders,
    };

    const request = new Request(requestUrl, requestInit);
    const response = await fetch(request);
    const data = await getBody<T>(response);

    return {
      status: response.status,
      data,
      headers: response.headers,
    } as FetchResponse<T>;
  } catch (error) {
    console.log(error);
    return { status: 500, data: null, headers: null } as FetchResponse<T>;
  }
};
