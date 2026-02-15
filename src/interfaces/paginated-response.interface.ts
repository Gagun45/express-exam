export interface IPaginatedResponse<T> {
    meta: {
        totalItems: number;
        totalPages: number;
        prevPage: boolean;
        nextPage: boolean;
        page: number;
        limit: number;
    };
    data: T[];
}
