import Image from "next/image";

type Props = {
    logo: any;
};

const LoginHeader = ({ logo }: Props) => {
    return (
        <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center">
                <Image src={logo} alt="logo" width={64} height={64} priority />
            </div>
            <h2 className="mt-6 text-lg sm:text-2xl font-bold text-gray-900">
                Login Here
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Enter your mobile number to receive OTP
            </p>
        </div>
    );
};

export default LoginHeader;
