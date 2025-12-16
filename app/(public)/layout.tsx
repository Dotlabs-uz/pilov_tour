import Footer from "@/components/custom/Footer";
import { Navbar } from "@/components/custom/Navbar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
