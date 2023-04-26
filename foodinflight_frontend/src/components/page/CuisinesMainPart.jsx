import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
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
  Button,
  Flex
} from "@chakra-ui/react"

import { BiArrowBack } from "react-icons/bi";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

const CuisinesMainPart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cuisine, setCuisine] = useState(null);
  const [cuisineError, setCuisineError] = useState(false);
  const [productsWithCertainCuisine, setAllProductsWithCertainCuisine] = useState([]);
  const [productsError, setProductsError] = useState(false);
  const { onAddToCart, onPlusToCart, onMinusFromCart, checkProductInCart, cartProducts } = useCartContext();
  const { cuisineName } = useParams();

  useEffect(() => {
    const getProductsWithCertainCuisine = async () => {
      try {
        const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/products/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (productsResponse.status === 200) {
          const productsJSON = await productsResponse.json();
          const filteredProducts = productsJSON.filter((product) => product.cuisine?.slug === cuisineName);
          setAllProductsWithCertainCuisine(filteredProducts);
        } else {
          setProductsError(true);
        }
      } catch (error) {
        setProductsError(true);
      }
    };

    const getCuisineData = async () => {
      setIsLoading(true);
      try {
        const cuisinesResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/cuisines/${cuisineName}/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (cuisinesResponse.status === 200) {
          const cuisineJSON = await cuisinesResponse.json();
          setCuisine(cuisineJSON);
          setIsLoading(false);
        } else {
          setCuisineError(true);
        }
      } catch (error) {
        setCuisineError(true);
      }
    };

    getProductsWithCertainCuisine();
    getCuisineData();
  }, [cuisineName, cartProducts]);


  return (
    <Box margin="10px 0px 0px 0px">

      <Box p="0px 0px 0px 20px">
        <Link
          style={{ textDecoration: "none" }}
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
          cuisine ? (
            <Heading
              as="h2"
              fontSize="2xl"
              p="10px 0px 0px 0px"
              key={cuisine.slug}
            >
              {cuisine.title}
            </Heading>
          ) : null
        }

      </Box>

      <Wrap justify="center" margin="20px 0px" p="5px">
        {
          productsWithCertainCuisine.map((product) => (
            <Box key={product.slug}>
              <WrapItem>
                <Card
                  maxW="296px"
                  h="340px"
                  mb="15px"
                  shadow="lg"
                  transition="200ms ease-out"
                  _hover={{ shadow: "md", h: "338px" }}
                >

                  <CardBody p="0px">
                    <Box>
                      <Link
                        href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${product.category.slug}/${product.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Box textAlign="left">
                          <Image
                            src={(product.images[0]?.image == null ? "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png" : product.images[0]?.image)}
                            borderRadius="0.375rem 0.375rem 0rem 0rem"
                            maxH="200px"
                            objectFit="cover"
                            margin="0px 0px 3px 0px"
                            transition="200ms"
                            _hover={{ opacity: "0.8" }}
                          />

                          <Flex flexDirection="column">
                            <Text p="10px 0px 0px 10px" fontWeight="500">{product.title}</Text>
                            <Spacer />
                            <Text p="5px 0px 0px 10px" textColor="blackAlpha.500" fontWeight="400">{product.weight}г</Text>
                          </Flex>

                        </Box>
                      </Link>
                    </Box>
                  </CardBody>

                  <CardFooter alignItems="center" padding="0px 10px 10px 10px">
                    <Text fontWeight="700">{product.price}₽</Text>

                    <Spacer />

                    <Box
                      bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                      _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                      borderRadius="10px"
                    >
                      {
                        checkProductInCart(product) ? (
                          <Flex
                            gap="10px"
                            alignItems="center"
                            h="-moz-min-content"
                          >

                            <Button
                              onClick={() => onMinusFromCart(product.slug)}
                              textColor="whiteAlpha.900"
                              bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                              _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                            >
                              <HiOutlineMinus />
                            </Button>

                            <Text textColor="whiteAlpha.900">
                              {cartProducts?.find(p => p.slug === product.slug)?.quantity}
                            </Text>

                            <Button
                              onClick={() => onPlusToCart(product.slug)}
                              textColor="whiteAlpha.900"
                              bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                              _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                            >
                              <HiOutlinePlus />
                            </Button>
                          </Flex>
                        ) : (
                          <Button
                            onClick={() => { onAddToCart(product) }}
                            textColor="whiteAlpha.900"
                            bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                            _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                          >
                            В корзину
                          </Button>
                        )
                      }
                    </Box>

                  </CardFooter>

                </Card>

              </WrapItem>
            </Box>
          ))

        }
      </Wrap>
    </Box>
  );
};

export default CuisinesMainPart