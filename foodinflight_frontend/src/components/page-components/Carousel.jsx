import React from "react";
import { 
  Box, 
  Image, 
} from "@chakra-ui/react";

const Carousel = () => {
  return (
    <Box className="carousel" border="2px solid blue" margin="20px">
      <Image src="/favicon.ico"></Image>
    </Box>
  )
}

export default Carousel