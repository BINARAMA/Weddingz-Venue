import React from 'react';
import Slider from 'react-slick';

// Settings for the Slick Carousel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

interface PortfolioCarouselProps {
  portfolio: string[];
}

const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({ portfolio }) => {
  return (
    <div className="mb-8 border-b pb-4">
      <p className="text-[#110069] text-xl font-bold mb-4">Portfolio:</p>
      <Slider {...settings}>
        {portfolio.map((imageUrl: string, index: number) => (
          <div key={index} className="px-2">
            <img
              src={imageUrl}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-5 object-cover rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PortfolioCarousel;