'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient, UseMutationResult } from '@tanstack/react-query'
import { login, verifyOTP, getProfile, logout } from '@/services/customers/customers'
import { useRouter } from 'next/navigation'
import { Customer, LoginOtpResponse, OtpVerifiedResponse } from '@/types/userTypes'

type AuthContextType = {
    user: Customer | null
    isLoading: boolean
    loginSendOtpMutation: UseMutationResult<LoginOtpResponse, unknown, { contact_no: string }>
    verifyOTPMutation: UseMutationResult<OtpVerifiedResponse, unknown, { contact_no: string; verification_code: string }>
    logoutMutation: UseMutationResult<any, unknown, void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Customer | null>(null)
    const router = useRouter()
    const queryClient = useQueryClient()

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: 0,
    })

    useEffect(() => {
        if (profileQuery.isSuccess) {
            setUser(profileQuery.data.data)
        } else if (profileQuery.isError) {
            setUser(null)

        }
    }, [profileQuery.status])

    const loginSendOtpMutation = useMutation({
        mutationFn: (credentials: { contact_no: string }) => login(credentials),
    })

    const verifyOTPMutation = useMutation({
        mutationFn: (data: { contact_no: string; verification_code: string }) =>
            verifyOTP({ contact_no: Number(data.contact_no), verification_code: Number(data.verification_code) }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['profile'] })
            router.push('/')
        },
    })

    const logoutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: async () => {
            setUser(null)
            queryClient.clear()
            router.push('/login')
        },
    })

    const value: AuthContextType = {
        user,
        isLoading: profileQuery.isFetching,
        loginSendOtpMutation,
        verifyOTPMutation,
        logoutMutation,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
