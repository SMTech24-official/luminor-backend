import { MongoServerError } from "mongodb";
import { IGenericErrorMessage } from "../interfaces/error";

const duplicateError = (error: MongoServerError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: "",
      message: error.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: "Phone Number And Email Must Have To Be Unique",
    errorCode: error.code,

    errorMessages: errors,
  };
};

export default duplicateError;
