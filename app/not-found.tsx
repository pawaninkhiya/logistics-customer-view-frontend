"use client"
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function NotFound() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 10000)
        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 ">
            <div className="max-w-md w-full text-center bg-white rounded-md shadow p-8 space-y-6 ">
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-gray-800 ">404</h1>
                    <h2 className="text-lg font-semibold text-gray-700">Page Not Found</h2>
                    <p className="text-gray-500 text-sm">
                        The page you&apos;re looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>
                <Button onClick={() => router.push("/")} className=" w-full">
                    Go back to Home
                </Button>
            </div>
        </div>
    )
}