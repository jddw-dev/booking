import { Pagination } from './pagination';

/**
 * Interface used to store paginated results
 */
export interface PaginatedResults<T> {
  pagination: Pagination;
  items: T[];
}
