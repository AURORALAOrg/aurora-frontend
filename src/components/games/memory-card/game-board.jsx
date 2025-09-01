import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import GameModal from './game-modal';
import { LEVELS } from './mock-data-memory-card/memory-levels';
import FlipCard from './flip-card';

const getRandomPairs = (cards, numPairs = 8) => {
  const textCards = cards.filter(card => card.type === 'text');
  const shuffledTextCards = [...textCards].sort(() => Math.random() - 0.5);
  const selectedTextCards = shuffledTextCards.slice(0, numPairs);
  
  const selectedPairs = selectedTextCards.flatMap(textCard => {
    const imageCard = cards.find(card => 
      card.type === 'image' && card.imageId === textCard.imageId
    );
    return imageCard ? [textCard, imageCard] : [];
  });
  
  return selectedPairs.sort(() => Math.random() - 0.5);
};

const GameBoard = () => {
  const { levelId } = useParams();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const levelCards = LEVELS[levelId.toUpperCase()]?.cards || [];
    const randomPairs = getRandomPairs(levelCards);
    setCards(randomPairs);
    setMoves(0);
    setMatches(0);
    setSelectedCards([]);
    setShowModal(false);
  }, [levelId]);

  const handleCardClick = (card) => {
    if (selectedCards.length < 2 && !card.flipped && !card.matched) {
      const newCards = cards.map((c) => 
        c.id === card.id ? { ...c, flipped: true } : c
      );
      setCards(newCards);
      
      const newSelectedCards = [...selectedCards, card];
      setSelectedCards(newSelectedCards);

      if (newSelectedCards.length === 2) {
        setMoves(prev => prev + 1);
        checkMatch(newSelectedCards);
      }
    }
  };

  const checkMatch = (selected) => {
    setTimeout(() => {
      const newCards = cards.map((card) => {
        const isSelected = selected.find((s) => s.id === card.id);
        if (selected[0].imageId === selected[1].imageId) {
          return isSelected ? { ...card, matched: true, flipped: true } : card;
        } else {
          return isSelected ? { ...card, flipped: false } : card;
        }
      });
      
      setCards(newCards);
      
      if (selected[0].imageId === selected[1].imageId) {
        setMatches(prev => {
          const newMatches = prev + 1;
          if (newMatches === 8) {
            setShowModal(true);
          }
          return newMatches;
        });
      }
      
      setSelectedCards([]);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4">
      <Link to="/games/memory-card" className="text-primary hover:text-primary-dark mb-0 inline-flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Levels
      </Link>

      <div className="flex justify-between mb-2 max-w-md mx-auto">
        <div className="text-lg flex items-center text-primary">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM13 7h-2v6l4.5 2.7.7-1.2-3.2-1.9V7z"/>
          </svg>
          Moves: {moves}
        </div>
        <div className="text-lg flex items-center text-primary">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.97,16L5,19C4.67,19.3 4.23,19.5 3.75,19.5A1.75,1.75 0 0,1 2,17.75V17.5L3,10.12C3.21,7.81 5.14,6 7.5,6H16.5C18.86,6 20.79,7.81 21,10.12L22,17.5V17.75A1.75,1.75 0 0,1 20.25,19.5C19.77,19.5 19.33,19.3 19,19L16.03,16H7.97M7,8V10H5V12H7V14H9V12H11V10H9V8H7M15.5,9A1.5,1.5 0 0,0 14,10.5A1.5,1.5 0 0,0 15.5,12A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 15.5,9M18.5,11A1.5,1.5 0 0,0 17,12.5A1.5,1.5 0 0,0 18.5,14A1.5,1.5 0 0,0 20,12.5A1.5,1.5 0 0,0 18.5,11Z"/>
          </svg>
          Matches: {matches}/8
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto">
        {cards.map((card) => (
          <FlipCard
            key={card.id}
            card={card}
            onCardClick={handleCardClick}
            disabled={selectedCards.length === 2}
          />
        ))}
      </div>

      {showModal && (
        <GameModal
          moves={moves}
          onPlayAgain={() => {
            const randomPairs = getRandomPairs(LEVELS[levelId.toUpperCase()]?.cards || []);
            setCards(randomPairs);
            setMoves(0);
            setMatches(0);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default GameBoard; 