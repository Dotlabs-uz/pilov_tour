import Footer from "@/components/custom/Footer";
import { Navbar } from "@/components/custom/Navbar";
import { CompareButton } from "@/components/custom/CompareButton";

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
			<CompareButton />
		</div>
	);
}
