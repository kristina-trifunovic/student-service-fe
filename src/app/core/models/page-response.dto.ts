export interface PageDto<T> {
  content: T[];
  totalElements: number;
  number: number; // pageNo
  size: number; // pageSize
}
