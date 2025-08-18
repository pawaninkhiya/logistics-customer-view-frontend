'use client'

import Navbar from "@/components/Navbar"
import PageLoading from "@/components/PageLoading"
import Container from "@/components/ui/Container"
import { useAuth } from "@/contexts/AuthProvider"



export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { isLoading ,user} = useAuth()

    if (isLoading) {
        return <PageLoading /> 
    }


    return (
        <Container className="px-4 py-3 md:py-6">
            <Navbar />
            <div className="flex flex-1">
                {children}
            </div>
        </Container>
    )
}
