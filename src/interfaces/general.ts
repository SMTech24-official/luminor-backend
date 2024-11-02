import { IGenericErrorMessage } from "./error";

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    count?: number;
  };
  data: T;
};
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
