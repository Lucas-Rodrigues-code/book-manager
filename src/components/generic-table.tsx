import { Pencil, CircleX } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Column {
  header: string;
  accessor: string;
}

interface GenericTableProps<T> {
  columns: Column[];
  data: T[];
  onOpen?: (row: T) => void;
  onDelete?: (id: string) => void;
}

export default function GenericTable<T extends { id: string }>({
  columns,
  data,
  onOpen,
  onDelete,
}: GenericTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.accessor}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: any) => (
          <TableRow key={row.id}>
            {columns.map((column: Column) => (
              <TableCell key={column.accessor}>
                {row[column.accessor]}
              </TableCell>
            ))}
            {onOpen && (
              <TableCell>
                <Button variant="outline" onClick={() => onOpen(row)}>
                  <Pencil />
                </Button>
              </TableCell>
            )}
            {onDelete && (
              <TableCell>
                <Button variant="destructive" onClick={() => onDelete(row.id)}>
                  <CircleX />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
