import React from 'react';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "text-yellow-500 text-[18px]" : "text-gray-400 text-[18px]"}>
        ★
      </span>
    );
  }
  return <div>{stars}</div>;
};

export default RatingStars;
