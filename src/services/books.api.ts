import { Book } from "@/types/book.type";
import api from "./api";

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>(`/books`);
  return response.data;
};

export const fetchBook = async (id: number): Promise<Book> => {
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
};

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const response = await api.post<Book>("/books", book);
  return response.data;
};

export const updateBook = async (id: string, book: Book): Promise<Book> => {
  const response = await api.put<Book>(`/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`);
};
