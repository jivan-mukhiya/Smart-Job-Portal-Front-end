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
  error?: string;
  path?: string;
  timestamp?: string;
  errors: ValidationError[];

  constructor(
    message: string,
    status = 500,
    code = "UNKNOWN_ERROR",
    errorCode = "UNKNOWN_ERROR",
    errors: ValidationError[] = [],
    error?: string,
    path?: string,
    timestamp?: string
  ) {
    super(message);

    this.name = "ApiError";

    this.status = status;
    this.code = code;
    this.errorCode = errorCode;

    this.error = error;
    this.path = path;
    this.timestamp = timestamp;

    this.errors = errors;

    Object.setPrototypeOf(
      this,
      ApiError.prototype
    );
  }
}