import React from 'react';
import { BookOpen, CheckCircle, Lock } from 'lucide-react';

const ReadingPage = () => {
    const readingTopics = [
        { id: 'vocabulary-building', title: 'Vocabulary Building', progress: 100, unlocked: true },
        { id: 'short-texts', title: 'Short Texts', progress: 95, unlocked: true },
        { id: 'comprehension', title: 'Reading Comprehension', progress: 70, unlocked: true },
        { id: 'articles', title: 'Articles & Essays', progress: 45, unlocked: true },
        { id: 'literature', title: 'Literature', progress: 15, unlocked: true },
        { id: 'technical-reading', title: 'Technical Reading', progress: 0, unlocked: false },
        { id: 'critical-analysis', title: 'Critical Analysis', progress: 0, unlocked: false },
        { id: 'research-papers', title: 'Research Papers', progress: 0, unlocked: false }
    ];

    return (
        <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Reading Practice</h1>
                    <p className="text-neutral-2">Build your reading skills from basic texts to complex literature</p>
                </div>

                <div className="space-y-3">
                    {readingTopics.map((topic) => (
                        <div key={topic.id} className="bg-dark-blue-5 rounded-lg p-4 border-2 border-[#1f2937]">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-md bg-dark-blue-4 flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-green-1" />
                                    </div>
                                    <span className="text-neutral-1 font-medium">{topic.title}</span>
                                </div>
                                {topic.unlocked ? (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        topic.progress === 100
                                            ? "bg-green/20"
                                            : "bg-green-1/20"
                                    }`}>
                                        <CheckCircle className={`w-5 h-5 ${topic.progress === 100 ? 'text-green' : 'text-green-1'}`} />
                                    </div>
                                ) : (
                                    <Lock className="w-5 h-5 text-neutral-4" />
                                )}
                            </div>
                            <div className="h-2 w-full bg-neutral-1/10 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${
                                        topic.progress === 100
                                            ? "bg-green"
                                            : topic.progress > 0
                                            ? "bg-green-1"
                                            : ""
                                    }`}
                                    style={{ width: `${topic.progress}%` }}
                                />
                            </div>
                            <div className="text-right mt-1">
                                <span className="text-xs text-neutral-2">{topic.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReadingPage;
