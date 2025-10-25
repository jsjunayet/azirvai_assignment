"use client";

import { ThemeProvider } from "@/context/themeContext";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Loader from "./Loader/Loader";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ThemeProvider>
      <Loader>
        <Toaster richColors position="top-center" />
        {children}
      </Loader>
    </ThemeProvider>
  );
};

export default MainLayout;
