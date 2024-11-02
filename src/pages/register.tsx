import { useState } from "react";

import { Eye, EyeOff, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { useNavigate } from "react-router-dom";
import { userRegister } from "@/services/user.api";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/types/user.type";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});

  const validate = () => {
    const newErrors: Partial<RegisterForm> = {};
    if (!formData.name) {
      newErrors.name = "Nome é obrigatória";
    }
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    }
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      return await userRegister(
        formData.name,
        formData.email,
        formData.password,
        "user"
      );
    },
    onSuccess: (data: User) => {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    },
    onError: () => {
      alert("Erro ao criar usuário");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-800">
            Registre-se
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4 text-[16px]">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-[16px]"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-[16px]"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="text-[16px]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            <Button className="w-full mt-6" type="submit">
              <LogIn className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => navigate("/auth/login")}>
            Já tem uma conta? Fazer login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
