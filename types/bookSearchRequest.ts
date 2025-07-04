export interface BookSearchRequest {
  title?: string;
  authorName?: string;
  categoryName?: string;
  isbn?: string;
  rating?: number;
  visible?: boolean;
  publicationDate?: string;
}
