'use client';

import logo from "@assets/logo.svg";
import LoginHeader from "@/components/auth/LoginHeader";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center md:bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-xl md:shadow-sm p-4 md:p-8 space-y-8">
                <LoginHeader logo={logo} />
                <LoginForm />
                {/* <div className="text-center text-xs sm:text-sm">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{" "}
                        <a href="/registration" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
