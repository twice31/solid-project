export interface ApiResponse<T> {
  value: T;
  methodName: string;
  errors: string[];
  timeGenerated: string;
  operationStatus: number;
}

export function hasApiErrors<T>(response: ApiResponse<T>): boolean {
  return response.errors.some((error) => error.trim().length > 0);
}
