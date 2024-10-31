import { User } from "@/types/user.type";
import api from "./api";

export const userLogin = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await api.get<User[]>(
    `/users?email=${email}&password=${password}`
  );
  if (response.data.length === 0) {
    throw new Error("Invalid credentials");
  }

  return {
    id: response.data[0].id,
    name: response.data[0].name,
    email: response.data[0].email,
    role: response.data[0].role,
  };
};

export const userRegister = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<User> => {
  const response = await api.post<User>("/users", {
    name,
    email,
    password,
    role,
  });
  return {
    id: response.data.id,
    name: response.data.name,
    email: response.data.email,
    role: response.data.role,
  };
};
