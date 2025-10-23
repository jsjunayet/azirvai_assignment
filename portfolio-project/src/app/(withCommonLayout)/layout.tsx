import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    
      <Navbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}
