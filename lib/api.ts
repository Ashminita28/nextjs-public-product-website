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

function extractHttpErrorMessage(json: unknown, status: number): string {
  if (
    typeof json === 'object' &&
    json !== null &&
    'error' in json &&
    typeof (json as { error?: { message?: string } }).error?.message ===
      'string'
  ) {
    return (json as { error: { message: string } }).error.message;
  }
  return `Request failed (${status})`;
}

async function getBearerToken(auth: boolean): Promise<string | undefined> {
  if (!auth) {
    return undefined;
  }
  const session = await getServerSession(authOptions);
  if (!session?.jwt) {
    throw new Error('Unauthorized');
  }
  return session.jwt;
}

async function strapiFetch(
  endpoint: string,
  options: FetchOptions,
): Promise<Response> {
  const { method = 'GET', body, cache = 'no-store', auth = false } = options;
  const token = await getBearerToken(auth);

  return fetch(`${BASE_URL}${endpoint}`, {
    method,
    cache,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

async function parseStrapiEnvelope<T, M>(
  res: Response,
): Promise<StrapiResponse<T, M>> {
  let json: unknown;
  try {
    json = await res.json();
  } catch {
    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }
    throw new Error('Invalid response from server');
  }

  if (!res.ok) {
    throw new Error(extractHttpErrorMessage(json, res.status));
  }

  return json as StrapiResponse<T, M>;
}

// CORE REQUEST
export async function request<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const res = await strapiFetch(endpoint, options);
  const json = await parseStrapiEnvelope<T, unknown>(res);

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
  const res = await strapiFetch(endpoint, options);
  const json = await parseStrapiEnvelope<T, M>(res);

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

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }
    throw new Error('Invalid response from server');
  }

  if (!res.ok) {
    const msg =
      typeof json === 'object' &&
      json !== null &&
      'error' in json &&
      typeof (json as { error?: { message?: string } }).error?.message ===
        'string'
        ? (json as { error: { message: string } }).error.message
        : 'Request failed';
    throw new Error(msg);
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
): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
