export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success?: boolean;
  status?: number;
  code?: string;
  error?: string;
  message?: string;
  path?: string;
  timestamp?: string;
  errors?: ValidationError[];
}

export class ApiError extends Error {
  status: number;
  code: string;
  errorCode: string;
  errors: ValidationError[];

  constructor(
    message: string,
    status = 500,
    code = "UNKNOWN_ERROR",
    errorCode = "UNKNOWN_ERROR",
    errors: ValidationError[] = []
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errorCode = errorCode;
    this.errors = errors;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}