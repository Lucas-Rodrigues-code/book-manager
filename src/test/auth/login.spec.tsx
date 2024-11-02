import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../../pages/login";

import { userLogin } from "@/services/user.api";
import { renderWithProvider } from "../setupTests";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("@/services/user.api", () => ({
  userLogin: jest.fn(),
}));

describe("LoginPage Component", () => {
  it("deve renderizar os campos de e-mail e senha e o botão de envio", () => {
    renderWithProvider(<LoginPage />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  it("deve chamar a função onSubmit com e-mail e senha ao enviar o formulário", async () => {
    const email = "admin@example.com";
    const password = "password";

    (userLogin as jest.Mock).mockResolvedValue({ email, role: "user" });

    renderWithProvider(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: password },
    });
    fireEvent.click(screen.getByText("Entrar"));

    expect(userLogin).toHaveBeenCalledWith(email, password);
  });

  it("deve mostrar mensagens de erro para campos obrigatórios", () => {
    renderWithProvider(<LoginPage />);

    fireEvent.click(screen.getByText("Entrar"));

    expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Senha é obrigatória")).toBeInTheDocument();
  });
});
