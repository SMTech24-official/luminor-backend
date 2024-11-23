import { SortOrder } from "mongoose";

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
type IOptionResult = {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  skip: number;
};
const calculatePagination = (options: IOptions): IOptionResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};