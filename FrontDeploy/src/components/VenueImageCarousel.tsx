import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface VenueImageCarouselProps {
  images?: string[];
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const VenueImageCarousel: React.FC<VenueImageCarouselProps> = ({ images }) => {
  return (
    <div className="w-full h-64">
      {images && images.length > 0 && (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          showDots
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {images.map((image, index) => (
            <div key={index} className="h-64 flex justify-center items-center">
              <img src={image} alt={`Venue image ${index + 1}`} className="h-full object-cover" />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default VenueImageCarousel;
