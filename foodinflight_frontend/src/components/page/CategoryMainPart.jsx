import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  Wrap,
  WrapItem,
  Card,
  CardBody, 
  CardFooter,
  Link,
  Image,
  Spacer,
  Button
} from "@chakra-ui/react"

import {BiArrowBack} from "react-icons/bi"
import { useParams } from "react-router-dom";

const CategoryMainPart = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);

  const { categoryName } = useParams();

  useEffect(() => {
    const getProductsWithCertainCategory = async() => {
      try {
        const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/products/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          }
        })
  
        if (productsResponse.status === 200) {
          const productsJSON = await productsResponse.json();
          const filteredProducts = productsJSON.filter((product) => product.category.slug === categoryName);
          setAllProducts(filteredProducts);
        } else {
          setProductsError(true);
        }
      } catch (error) {
        setCategoriesError(true);
      }
      
    }

    const getCategories = async () => {
      setIsLoading(true);
      try {
        const categoriesResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/categories/`, {
          method: "GET",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          }
        })
  
  
        if (categoriesResponse.status === 200) {
          const categoriesJSON = await categoriesResponse.json();
          const filteredCategoryName = categoriesJSON.filter((name) => name.slug === categoryName);
          setAllCategories(filteredCategoryName);
        } else {
          setCategoriesError(true);
        }
      } catch (error) {
        setCategoriesError(true);
      }
      
    }

    getProductsWithCertainCategory();
    getCategories();
  }, [categoryName])

  return (
    <Box margin="10px 0px 0px 0px">

      <Box p="0px 0px 0px 20px">
        <Link
          style={{textDecoration:"none"}}
          href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}
        >
          <Button
            bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
            iconSpacing="0px 10px 0px 0px"
            leftIcon={<BiArrowBack />}
            textColor="black"
          >
            <Text>Главная</Text>
          </Button>
        </Link>

        {
          allCategories.map((category) => (
              <Heading 
                as="h2" 
                fontSize="2xl"
                p="10px 0px 0px 0px"
              >
                {category.title}
              </Heading>
          ))
        } 

      </Box>

      <Wrap justify="center" margin="20px 0px" p="5px">
      {
        allProducts.map((product) => (
            <Box>
              <WrapItem>
                <Card 
                  maxW="296px" 
                  h="320px" 
                  mb="15px"
                  shadow="lg"
                  transition="200ms ease-out"
                  _hover={{shadow:"md", h:"318px"}}
                >

                  <CardBody p="0px">
                    <Box>
                      <Link 
                        href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${product.category.slug}/${product.slug}`} 
                        style={{textDecoration: "none"}}
                      >
                        <Box textAlign="left">
                          <Image 
                            src={product.images[0]?.image}
                            borderRadius="0.375rem 0.375rem 0rem 0rem"
                            margin="0px 0px 3px 0px"
                            transition="200ms"
                            _hover={{opacity:"0.8"}}
                          />

                          <Text p="10px 0px 0px 10px" fontWeight="500">{product.title}</Text>
                                    
                        </Box>
                      </Link>
                    </Box>
                  </CardBody>

                  <CardFooter alignItems="center" padding="0px 10px 10px 10px">
                    <Text fontWeight="700">{product.price}₽</Text>

                    <Spacer/>

                    <Button
                      textColor="whiteAlpha.900"
                      bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                      _hover={{bgGradient: "linear(to-t, #6E72FC, #AD1DEB)"}}
                    >
                      В корзину
                    </Button>

                  </CardFooter>

                </Card>

              </WrapItem>
            </Box>
            
        ))
      }
      </Wrap>
    </Box>
  )
}

export default CategoryMainPart