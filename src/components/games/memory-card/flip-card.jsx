import React from 'react';
import PropTypes from 'prop-types';

const FlipCard = ({ card, onCardClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.flipped && !card.matched) {
      onCardClick(card);
    }
  };

  return (
    <div className="aspect-square [perspective:1000px] cursor-pointer w-full max-w-[150px] mx-auto" onClick={handleClick}>
      <div
        className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
          card.flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0">
          <div className="h-full w-full rounded-xl bg-primary flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl">
            ?
          </div>
        </div>
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="h-full w-full rounded-xl bg-white flex items-center justify-center p-2">
            {card.type === 'text' ? (
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center">{card.value}</span>
            ) : (
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{card.value}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

FlipCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageId: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'image']).isRequired,
    value: PropTypes.string.isRequired,
    flipped: PropTypes.bool.isRequired,
    matched: PropTypes.bool.isRequired
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default FlipCard; 