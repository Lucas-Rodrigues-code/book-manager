import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CardBook from "@/components/card-book";
import { fetchBooks } from "@/services/books.api";
import ErrorComponent from "@/components/error-component";
import LoadingComponent from "@/components/loading-component";
import { Book } from "@/types/book.type";

const ITEMS_PER_PAGE = 8;

export default function ListBookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: async () => await fetchBooks(),
  });

  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  if (isError) {
    return <ErrorComponent message="Erro ao carregar os livros" />;
  }
  return (
    <div className="space-y-6">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800">
              Catálogo de Livros
            </CardTitle>
            <CardDescription>Explore nossa coleção de livros</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2 w-full border-none"
                placeholder="Pesquisar por título ou autor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedBooks.map((book) => (
                <CardBook key={book.id} {...book} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

type PaginationProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
};

function Pagination({
  setCurrentPage,
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <>
      <Button
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4 mr-2" /> Anterior
      </Button>
      <div className="text-sm text-gray-600">
        Página {currentPage} de {totalPages}
      </div>
      <Button
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Próxima <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </>
  );
}
