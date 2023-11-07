/**
 * Interface used to store paginated results
 */
export interface PaginatedResults<T> {
  page: number;
  perPage: number;
  total: number;
  items: T[];
}
