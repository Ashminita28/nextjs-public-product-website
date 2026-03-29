// lib/api.ts

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  StrapiResponse,
  StrapiSuccessResponse,
  isErrorResponse,
} from './types/api-types';

const BASE_URL = process.env.STRAPI_URL!;

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  cache?: RequestCache;
  auth?: boolean;
};

// CORE REQUEST
export async function request<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { method = 'GET', body, cache = 'no-store', auth = false } = options;

  let token: string | undefined;
  if (auth) {
    const session = await getServerSession(authOptions);

    if (!session?.jwt) {
      throw new Error('Unauthorized');
    }

    token = session.jwt;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    cache,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const json: StrapiResponse<T, unknown> = await res.json();

  if (isErrorResponse(json)) {
    throw new Error(json.error.message);
  }

  return json.data;
}

// REQUEST WITH META
export async function requestWithMeta<T, M>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<StrapiSuccessResponse<T, M>> {
  const { method = 'GET', body, cache = 'no-store', auth = false } = options;

  let token: string | undefined;

  if (auth) {
    const session = await getServerSession(authOptions);

    if (!session?.jwt) {
      throw new Error('Unauthorized');
    }

    token = session.jwt;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    cache,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const json: StrapiResponse<T, M> = await res.json();

  if (isErrorResponse(json)) {
    throw new Error(json.error.message);
  }

  return json;
}

export async function requestRaw<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { method = 'GET', body, cache = 'no-store' } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    cache,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message || 'Request failed');
  }

  return json as T;
}
export type ApiMessage = {
  message?: string;
  error?: string;
};

export async function parseJsonSafely<T>(
  response: Response,
): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
