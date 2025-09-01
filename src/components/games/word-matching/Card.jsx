
import { motion } from 'framer-motion';

const Card = ({ card, isFlipped, isMatched, onClick }) => {
  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        className={`w-48 h-20 cursor-pointer rounded-lg flex flex-col items-center justify-center ${
          isMatched 
            ? 'bg-green-500 text-white'
            : isFlipped 
              ? 'bg-blue-500 text-white'
              : 'bg-blue-100'
        }`}
        onClick={onClick}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          transition: { duration: 0.3 }
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isMatched ? 'none' : 'rotateY(180deg)',
          }}
        >
          {(isFlipped || isMatched) && (
            <div className="flex flex-col items-center">
              <span className="text-sm mb-1">
                {card.language === 'en' ? '🇺🇸' : '🇪🇸'}
              </span>
              <span className="text-center px-2 text-sm font-medium">
                {card.word}
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isMatched ? 'rotateY(180deg)' : 'none',
          }}
        >
          {!isFlipped && !isMatched && (
            <span className="text-blue-500 text-2xl font-bold">?</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Card;