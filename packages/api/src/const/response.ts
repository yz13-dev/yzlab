export type ApiSuccessResponse<T> = {
  data: T;
  status: number;
};

export type ApiErrorResponse = {
  data: null;
  status: number;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type FetchResponse<T> = ApiResponse<T> & {
  headers: Headers | null;
};
