import React from "react";
import { Image, Box, ChakraProvider, AspectRatio } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
  portfolio?: string[] | undefined;
}

const Caro: React.FC<Props> = ({ portfolio }) => {
  const slides = portfolio?.map((image) => ({ image }));
  console.log("portfolio: ", portfolio);

  return (
    <ChakraProvider>
      <Box p={4} color="white">
        <Carousel infiniteLoop>
          {slides?.map((slide, index) => (
            <AspectRatio key={index} maxH={"600px"}>
              <Image src={slide.image} />
            </AspectRatio>
          ))}
        </Carousel>
      </Box>
    </ChakraProvider>
  );
};

export default Caro;
