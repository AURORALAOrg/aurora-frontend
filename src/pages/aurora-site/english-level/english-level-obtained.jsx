import React from 'react';
import { FileText } from 'lucide-react';

const CertificationCard = ({ title, description, variant = 'pink', imageSrc }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="relative h-40">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${title} Banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`${variant === 'pink' ? 'bg-pink-400' : 'bg-blue-600'} h-full`} />
        )}

        {/* Play button */}
        <div className="absolute top-4 left-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-yellow-300 rounded-full opacity-75" />
            ))}
          </div>
        </div>

        {/* Certificate illustration */}
        <div className="absolute left-4 top-16">
          <div className="w-20 h-24 bg-white/20 rounded-lg" />
        </div>

        {/* Graduation cap */}
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M22 10L12 5 2 10l10 5 10-5zM6 12v4l6 3 6-3v-4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-gray-900 font-medium mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>

        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Mint
          </button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CertificationsObtained = () => {
  const certifications = [
    {
      title: 'A1 Certification',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      variant: 'pink',
      imageSrc: '/src/assets/certification_banner.png',
    },
    {
      title: 'A2 Certification',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      variant: 'blue',
      imageSrc: '/src/assets/certification_banner_2.png',
    },
    {
      title: 'B1 Certification',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      variant: 'pink',
      imageSrc: '/src/assets/certification_banner.png',
    },
    {
      title: 'B2 Certification',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      variant: 'pink',
      imageSrc: '/src/assets/certification_banner_2.png',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Certifications</h1>
        <p className="text-base text-gray-600">{certifications.length} Certifications Obtained</p>
      </div>

      {/* Grid layout for certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
          <CertificationCard
            key={index}
            title={cert.title}
            description={cert.description}
            variant={cert.variant}
            imageSrc={cert.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default CertificationsObtained;
