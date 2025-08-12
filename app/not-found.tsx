"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiArrowLeft, FiHome } from 'react-icons/fi'

export default function NotFound() {
    const router = useRouter()

    // Optional: Auto-redirect after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 10000) // 10 seconds
        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 transition-all duration-300 hover:shadow-xl">
                <div className="space-y-3">
                    <h1 className="text-7xl font-bold text-gray-800 dark:text-white">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Need help? <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact support</Link>
                </p>
            </div>
        </div>
    )
}