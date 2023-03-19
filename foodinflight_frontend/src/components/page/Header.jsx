import React from "react";
import { Text, Image, Flex, Center, Spacer } from "@chakra-ui/react";
import EnterAlerDialog from "../page-components/EnterAlertDialog";
import SearchBar from "../page-components/SearchBar";
import AdressBar from "../page-components/AdressBar";


const Header = () => {
  return (
    <Flex
      className="header"  
      position="fixed" 
      zIndex="100000" 
      bgColor="white" 
      h="80px" 
      w="100%"
      borderBottom="1px solid rgba(0, 0, 0, 0.15)" 
      padding="10px 20px"
    >
      <Center 
        className="header__logo" 
        minW="120px"
        h="100%"
        display="block"
      >
        <Image src="/icons/full-logo.png" h="100%" maxW="100%" alt="full-logo"></Image>
      </Center>

      <Spacer/>

      <SearchBar/>

      <Spacer/>

      <AdressBar/>

      <Spacer/>

      <Center className="header__adress-bar" w="200px">
        <EnterAlerDialog/>
      </Center>
    </Flex>
  )
}

export default Header;