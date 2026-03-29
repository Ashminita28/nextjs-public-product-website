// lib/types/api-types.ts

//GENERIC STRAPI STRUCTURE

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: unknown;
}

export interface StrapiErrorResponse {
  data: null;
  error: StrapiError;
}

export interface StrapiSuccessResponse<T, M = unknown> {
  data: T;
  meta: M;
}

export type StrapiResponse<T, M = unknown> =
  | StrapiSuccessResponse<T, M>
  | StrapiErrorResponse;

//REQUEST TYPES
export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  identifier: string;
  password: string;
}

export interface NewsletterBody {
  data: {
    email: string;
    subscribedAt: string;
  };
}

//TYPE GUARDS
export function isErrorResponse<T, M>(
  res: StrapiResponse<T, M>,
): res is StrapiErrorResponse {
  return 'error' in res;
}

//META TYPES

export interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
