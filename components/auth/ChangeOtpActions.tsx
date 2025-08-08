type Props = {
    onChangeNumber: () => void;
    onResendOtp: (e: React.FormEvent) => void;
    isLoading: boolean;
};

const ChangeOtpActions = ({ onChangeNumber, onResendOtp, isLoading }: Props) => {
    return (
        <div className="flex items-center justify-between text-sm">
            <button
                type="button"
                onClick={onChangeNumber}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                disabled={isLoading}
            >
                Change Number
            </button>
            <button
                type="button"
                onClick={onResendOtp}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                disabled={isLoading}
            >
                Resend OTP
            </button>
        </div>
    );
};

export default ChangeOtpActions;
        