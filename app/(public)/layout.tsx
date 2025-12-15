import Footer from "@/components/custom/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
        <Footer />
  
    </div>
    );
}
