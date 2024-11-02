import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Book } from "@/types/book.type";
import {
  createBook,
  deleteBook,
  fetchBook,
  fetchBooks,
  updateBook,
} from "@/services/books.api";

import { useToast } from "@/hooks/use-toast";
import GenericTable from "./generic-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

type NewBook = {
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  genre: string;
  publishedYear: number;
};

export default function BookManagement({ bookId }: { bookId: string | null }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<NewBook>({
    title: "",
    author: "",
    coverUrl: "",
    description: "",
    genre: "",
    publishedYear: 0,
  });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  const { data: dataBook } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      if (bookId) {
        return await fetchBook(bookId);
      }
    },
    enabled: !!bookId,
  });

  useEffect(() => {
    if (dataBook) {
      setSelectedBook(dataBook);
      setIsDialogOpen(true);
    }
  }, [dataBook]);

  const { data, refetch: refetchBooks } = useQuery({
    queryKey: ["books"],
    queryFn: async () => await fetchBooks(),
  });

  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]);

  const AddMutation = useMutation({
    mutationFn: () => createBook(newBook),
    onSuccess: () => {
      refetchBooks();
      setNewBook({
        title: "",
        author: "",
        coverUrl: "",
        description: "",
        genre: "",
        publishedYear: 0,
      });
      toast({
        variant: "default",
        title: "Criado com sucesso",
        description: "O livro foi criado com sucesso",
        className: "bg-[#69BA5D] text-white",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar livro",
        description: error.message,
      });
    },
  });
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    AddMutation.mutate();
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      refetchBooks();
      toast({
        variant: "default",
        title: "Deletado com sucesso",
        description: "O livro foi deletado com sucesso",
        className: "bg-[#69BA5D] text-white",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao deletar livro",
        description: error.message,
      });
    },
  });
  const handleDeleteBook = (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateMutation = useMutation({
    mutationFn: (body: Book) => updateBook(body.id, body),
    onSuccess: () => {
      refetchBooks();
      toast({
        variant: "default",
        title: "Atualizado com sucesso",
        description: "O livro foi atualizado com sucesso",
        className: "bg-[#69BA5D] text-white",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar livro",
        description: error.message,
      });
    },
  });
  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Atualizar livro");
    if (selectedBook) {
      updateMutation.mutate(selectedBook);
    }
  };

  const openEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Título", accessor: "title" },
    { header: "Autor", accessor: "author" },
    { header: "Descrição", accessor: "description" },
    { header: "Gênero", accessor: "genre" },
    { header: "Ano de Publicação", accessor: "publishedYear" },
    { header: "Capa", accessor: "coverUrl" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestão de livros</CardTitle>
        <CardDescription>
          Adicione novos livros e visualize a coleção existente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddBook} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverUrl">Imagem de capa</Label>
              <Input
                id="coverUrl"
                type="url"
                value={newBook.coverUrl}
                onChange={(e) =>
                  setNewBook({ ...newBook, coverUrl: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                type="textarea"
                value={newBook.description}
                onChange={(e) =>
                  setNewBook({ ...newBook, description: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genero</Label>
              <Input
                id="genre"
                value={newBook.genre}
                onChange={(e) =>
                  setNewBook({ ...newBook, genre: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publishedYear">Ano de publicação</Label>
              <Input
                id="publishedYear"
                type="number"
                value={newBook.publishedYear}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    publishedYear: Number(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>
          <Button type="submit">Adicionar livro</Button>
        </form>
      </CardContent>
      <CardFooter>
        <GenericTable
          columns={columns}
          data={books || []}
          onOpen={openEditBook}
          onDelete={handleDeleteBook}
        />
        {selectedBook && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-blue-50">
              <DialogHeader>
                <DialogTitle className="text-blue-800">
                  {selectedBook.title}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdateBook} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={selectedBook.title}
                      onChange={(e) =>
                        setSelectedBook({
                          ...selectedBook,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Autor</Label>
                    <Input
                      id="author"
                      value={selectedBook.author}
                      onChange={(e) =>
                        setSelectedBook({
                          ...selectedBook,
                          author: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverUrl">Imagem de capa</Label>
                    <Input
                      id="coverUrl"
                      type="url"
                      value={selectedBook.coverUrl}
                      onChange={(e) =>
                        setSelectedBook({
                          ...selectedBook,
                          coverUrl: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      type="textarea"
                      value={selectedBook.description}
                      onChange={(e) =>
                        setSelectedBook({
                          ...selectedBook,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genero</Label>
                    <Input
                      id="genre"
                      value={selectedBook.genre}
                      onChange={(e) =>
                        setSelectedBook({
                          ...selectedBook,
                          genre: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publishedYear">Ano de publicação</Label>
                    <Input
                      id="publishedYear"
                      type="number"
                      value={selectedBook.publishedYear}
                      onChange={(e) =>
                        setSelectedBook({
                          ...selectedBook,
                          publishedYear: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <Button type="submit">Atualizar livro</Button>.
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDeleteBook(selectedBook.id)}
                >
                  Deletar livro
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
