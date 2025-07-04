
import { Book } from "@/types";
import { BookSearchRequest } from "@/types/bookSearchRequest";
import { PageResponse } from "@/types/pageResponse";

const API_URL = process.env.NEXT_PUBLIC_MS_BOOKS_CATALOGUE!;

export async function fetchBooks(page: number, size: number): Promise<PageResponse<Book>> {
  const res = await fetch(`${API_URL}?page=${page}&size=${size}`, {
    headers: { "X-Api-Version": "1" }
  });
  if (!res.ok) throw new Error("Error fetching books");
  const json = await res.json();
  return json.data;
}

export async function searchBooks(searchRequest: BookSearchRequest, page: number, size: number): Promise<PageResponse<Book>> {
  const res = await fetch(`${API_URL}/search-elastic?page=${page}&size=${size}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "1"
    },
    body: JSON.stringify(searchRequest)
  });

  if (!res.ok) throw new Error("Error searching books");
  const json = await res.json();
  return json.data;
}
