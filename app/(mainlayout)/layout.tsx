import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container className="px-4 py-3 md:py-6">
            <Navbar />
            <div className="flex flex-1">
                {children}
            </div>
        </Container>
    );
}
