"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
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
exports.paginationHelpers = {
    calculatePagination,
};
