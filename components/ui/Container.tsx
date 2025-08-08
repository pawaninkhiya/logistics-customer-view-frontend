import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className = "", ...rest }: ContainerProps) => {
    return (
        <div
            className={`max-w-[1540px] h-screen flex flex-col bg-white ${className}`}
            {...rest}
        >
            <div className="flex flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
};

export default Container;
