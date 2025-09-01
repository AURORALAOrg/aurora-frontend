import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faqData from './faqData';
import { Link } from 'react-router-dom';

const FAQPage = () => {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="min-h-screen">
            <div className="relative bg-black overflow-hidden" style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)'
            }}>
                <div className="absolute top-6 left-6 z-20">
                    <Link
                        to="/"
                        className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                        aria-label="Back to main page"
                    >
                        <img src="/aurora-logo.png" alt="" class="w-10 h-10" />

                    </Link>
                </div>

                <div className="relative z-10 text-center py-20 px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
                        Everything you need to know about AURORA's AI-powered language learning platform
                    </p>
                </div>
            </div>
            <div className="bg-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-1">
                            {faqData.map((item, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <button
                                        onClick={() => toggleItem(index)}
                                        aria-expanded={openItems[index] ? 'true' : 'false'}
                                        aria-controls={`faq-answer-${index}`}
                                        className="w-full px-6 py-6 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200 rounded-lg"
                                    >

                                        <div className="flex justify-between items-center">
                                            <h3
                                                id={`faq-question-${index}`}
                                                className="text-lg font-semibold text-gray-900 pr-8">
                                                {item.question}
                                            </h3>
                                            <ChevronDown
                                                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 flex-shrink-0 ${openItems[index] ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </div>
                                    </button>

                                    <div
                                        id={`faq-content-${index}`}
                                        role="region"
                                        aria-labelledby={`faq-question-${index}`}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems[index] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-6 pb-6">
                                            <p className="text-gray-700 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white py-16 mt-12">
                        <div className="text-center max-w-4xl mx-auto px-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                                Still Have Questions?
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Our support team is here to help you get the most out of AURORA
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="mailto:aurorala.web3@gmail.com">
                                    <button className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
                                        Contact Support
                                    </button>
                                </a>
                                <Link to="/team">
                                    <button className="bg-white text-gray-700 font-semibold py-4 px-8 rounded-lg border border-gray-300 hover:border-gray-400">
                                        Learn More About Us
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;