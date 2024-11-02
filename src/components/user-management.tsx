import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
import { User } from "@/types/user.type";
import { createUser, deleteUser, fetchUsers } from "@/services/user.api";
import { useToast } from "@/hooks/use-toast";
import GenericTable from "./generic-table";

type NewUser = {
  name: string;
  email: string;
  password: string;
  role: string;
};
export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const { toast } = useToast();

  const { data, refetch: refetchUser } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await fetchUsers(),
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const mutationAdd = useMutation({
    mutationFn: () => createUser(newUser),
    onSuccess: () => {
      refetchUser();
      setNewUser({ name: "", email: "", password: "", role: "" });
      toast({
        variant: "default",
        title: "Criado com sucesso",
        description: "O usuário foi criado com sucesso",
        className: "bg-[#69BA5D] text-white",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar usuário",
        description: error.message,
      });
    },
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      mutationAdd.mutate();
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (_, id) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast({
        variant: "default",
        title: "Deletado com sucesso",
        description: "O usuário foi deletado com sucesso",
        className: "bg-[#2563EB] text-white",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao deletar",
        description: error.message,
      });
    },
  });

  const handleDeleteUser = (id: string) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nome", accessor: "name" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de usuários</CardTitle>
        <CardDescription>
          Crie novos usuários e visualize os existentes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
            </div>
          </div>
          <Button type="submit">Adicionar usuário</Button>
        </form>
      </CardContent>
      <CardFooter>
        <GenericTable
          columns={columns}
          data={users}
          onDelete={handleDeleteUser}
        />
      </CardFooter>
    </Card>
  );
}
