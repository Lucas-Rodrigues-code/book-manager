import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/user-management";
import BookManagement from "@/components/book-management";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardPage() {
  const { role } = useAuth();
  const navigate = useNavigate();

  if (role !== "admin" && role !== "superAdmin") {
    navigate("/");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs
        defaultValue={`${role !== "superAdmin" ? "books" : "users"}`}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            value="users"
            className={`${role !== "superAdmin" && "hidden"}`}
          >
            Gestão de usuários
          </TabsTrigger>
          <TabsTrigger value="books">Gestão de livros</TabsTrigger>
        </TabsList>
        <TabsContent
          value="users"
          className={`${role !== "superAdmin" && "hidden"}`}
        >
          <UserManagement />
        </TabsContent>
        <TabsContent value="books">
          <BookManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
