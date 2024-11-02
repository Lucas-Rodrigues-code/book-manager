import { AuthProvider } from "@/contexts/auth";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
const queryClient = new QueryClient();

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  );
};

export const renderWithProvider = (ui: React.ReactElement) => {
  return render(<AppProvider>{ui}</AppProvider>);
};
