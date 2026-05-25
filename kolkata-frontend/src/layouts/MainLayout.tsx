import { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isDark, toggle: toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer isDark={isDark} />
    </div>
  );
}
