import { Book } from "@/types/book.type";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function CardBook(book: Book) {
  return (
    <Card
      key={book.id}
      className="flex flex-col hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={book.coverUrl}
        alt={`Capa de ${book.title}`}
        className="w-full h-48 object-cover"
      />
      <CardContent className="flex-grow p-4">
        <h3 className="font-semibold text-lg mb-1 text-blue-800">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-xs text-gray-500">{book.publishedYear}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Ver Detalhes
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-blue-50">
            <DialogHeader>
              <DialogTitle className="text-blue-800">{book.title}</DialogTitle>
              <DialogDescription className="text-blue-600">
                por {book.author} • {book.publishedYear}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <img
                src={book.coverUrl}
                alt={`Capa de ${book.title}`}
                className="w-full h-48 object-cover"
              />
              <h4 className="text-sm font-semibold text-blue-700 mb-2">
                Descrição:
              </h4>
              <p className="text-sm text-blue-600">{book.description}</p>
              <p className="text-sm text-blue-500 mt-2">Gênero: {book.genre}</p>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
