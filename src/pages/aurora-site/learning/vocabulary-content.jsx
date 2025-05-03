import React from 'react';
import { FileText, CheckCircle, Lock } from 'lucide-react';

const VocabularyPage = () => {
    const vocabTopics = [
        { id: 'synonyms', title: 'Synonyms', progress: 100, unlocked: true },
        { id: 'antonyms', title: 'Antonyms', progress: 85, unlocked: true },
        { id: 'phrasal-verbs', title: 'Phrasal Verbs', progress: 60, unlocked: true },
        { id: 'idioms', title: 'Idioms & Expressions', progress: 20, unlocked: true },
        { id: 'word-formation', title: 'Word Formation', progress: 0, unlocked: false },
        { id: 'collocations', title: 'Collocations', progress: 0, unlocked: false },
        { id: 'homophones', title: 'Homophones', progress: 0, unlocked: false },
        { id: 'confused-words', title: 'Commonly Confused Words', progress: 0, unlocked: false }
    ];

    return (
        <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Vocabulary</h1>
                    <p className="text-neutral-2">Enhance your word power with engaging lessons and exercises</p>
                </div>

                <div className="space-y-3">
                    {vocabTopics.map((topic) => (
                        <div key={topic.id} className="bg-dark-blue-5 rounded-lg p-4 border-2 border-[#1f2937]">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-md bg-dark-blue-4 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-light-blue-1" />
                                    </div>
                                    <span className="text-neutral-1 font-medium">{topic.title}</span>
                                </div>
                                {topic.unlocked ? (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        topic.progress === 100
                                            ? "bg-green/20"
                                            : "bg-light-blue-1/20"
                                    }`}>
                                        <CheckCircle className={`w-5 h-5 ${topic.progress === 100 ? 'text-green' : 'text-light-blue-1'}`} />
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
                                            ? "bg-light-blue-1"
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

export default VocabularyPage;
