export enum ErrorTypes {
  NETWORK_ERROR = "NETWORK_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  CONFLICT_ERROR = "CONFLICT_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export class CustomError extends Error {
  type: ErrorTypes;

  constructor(type: ErrorTypes, message?: string) {
    super(message);
    this.name = "CustomError";
    this.type = type;
  }
}
