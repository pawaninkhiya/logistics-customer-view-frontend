"use client"
import React from 'react';
import { Icons } from '@/assets/assets';
import Link from 'next/link';

const CustomerSupportPage = () => {
    const supportTopics = [
        {
            title: "Account Issues",
            icon: <Icons.User className="h-6 w-6 text-blue-600" />,
            items: [
                "Can't log in to my account",
                "Need to reset my password",
                "Account security concerns",
                "Profile information update"
            ]
        },
        {
            title: "Payment & Billing",
            icon: <Icons.ArrowRight className="h-6 w-6 text-purple-600" />,
            items: [
                "Payment method issues",
                "Subscription questions",
                "Invoice requests",
                "Refund inquiries"
            ]
        },
        {
            title: "Technical Support",
            icon: <Icons.Settings className="h-6 w-6 text-green-600" />,
            items: [
                "App not working properly",
                "Website errors",
                "Performance issues",
                "Feature requests"
            ]
        }
    ];

    const faqs = [
        {
            question: "How do I contact support directly?",
            answer: "You can email us at support@example.com or use the live chat feature during business hours (9AM-5PM, Mon-Fri)."
        },
        {
            question: "What's your average response time?",
            answer: "We typically respond to support requests within 24 hours during business days."
        },
        {
            question: "Do you offer phone support?",
            answer: "Currently we only offer email and live chat support to ensure we can properly document all issues."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Support</h1>
                <p className="text-gray-600">We're here to help you with any questions or issues you may have.</p>
            </div>

            <div className="mb-12">
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <div className="flex items-center">
                        <Icons.ArrowLeft className="h-8 w-8 text-blue-600 mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Need immediate help?</h2>
                            <p className="text-gray-600">Our live chat is available now</p>
                        </div>
                    </div>
                    <button className="mt-4 w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-sm hover:shadow-md">
                        Start Live Chat
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {supportTopics.map((topic, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition duration-200">
                            <div className="flex items-center mb-4">
                                {topic.icon}
                                <h3 className="ml-3 text-lg font-medium text-gray-900">{topic.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {topic.items.map((item, i) => (
                                    <li key={i} className="text-sm text-gray-600 hover:text-gray-900">
                                        <Link href="#" className="flex items-center">
                                            <Icons.ArrowRight className="h-4 w-4 mr-2 text-gray-400" />
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4">
                            <button className="flex justify-between items-center w-full text-left">
                                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                                <Icons.Plus className="h-5 w-5 text-gray-500" />
                            </button>
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Still need help?</h2>
                <p className="text-gray-600 mb-4">Send us a message and we'll get back to you as soon as possible.</p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="What can we help you with?"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Please describe your issue in detail..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-sm hover:shadow-md"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomerSupportPage;