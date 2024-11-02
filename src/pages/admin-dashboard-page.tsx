import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/user-management";
import BookManagement from "@/components/book-management";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Gestão de usuários</TabsTrigger>
          <TabsTrigger value="books">Gestão de livros</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="books">
          <BookManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
