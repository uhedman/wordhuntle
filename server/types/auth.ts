import { Request } from "express";

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}
