"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { Icons } from "@/assets/icons";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
    isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDestructive = false,
    isLoading = false,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 overflow-y-auto"
                >
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Center Container */}
                    <div className="flex min-h-full items-center justify-center p-6">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 500 }}
                            className="relative w-full max-w-sm transform overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-black/5"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                            >
                                <Icons.Cross className="h-5 w-5 text-gray-500" />
                            </button>

                            {/* Content */}
                            <div className="p-6 text-center">
                                {isDestructive && (
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                        <Icons.AlertTriangle className="h-6 w-6 text-red-600" />
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                                <p className="mt-2 text-sm text-gray-500">{description}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 border-t border-gray-100 p-4 bg-gray-50">
                                <Button
                                    variant="danger"
                                    onClick={onConfirm}
                                    className={`flex-1`}
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <Icons.Loader className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {confirmText}
                                </Button>
                                <Button
                                    onClick={onClose}
                                    variant="secondary"
                                    className="flex-1"
                                    disabled={isLoading}
                                >
                                    {cancelText}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
