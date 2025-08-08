import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className = "", ...rest }: ContainerProps) => {
    return (
        <div
            className={`max-w-[1540px] mx-auto h-full max-h-screen flex flex-col bg-white overflow-y-auto scroll-hidden ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Container;
