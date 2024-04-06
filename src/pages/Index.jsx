import React, { useState, useEffect } from "react";
import { Box, Button, Container, Text, useToast, VStack, Center } from "@chakra-ui/react";

const Index = () => {
  const [gameState, setGameState] = useState("waiting"); // waiting, ready, clicked
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const toast = useToast();

  useEffect(() => {
    let timeout;
    if (gameState === "ready") {
      timeout = setTimeout(
        () => {
          setGameState("clicked");
          setStartTime(Date.now());
        },
        Math.floor(Math.random() * 2000) + 1000,
      ); // 1-3 second delay
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [gameState]);

  const handleStart = () => {
    setGameState("ready");
    setEndTime(0);
  };

  const handleClickBox = () => {
    if (gameState === "clicked") {
      setEndTime(Date.now());
      setGameState("waiting");
    } else {
      toast({
        title: "Too soon!",
        description: "Wait for the color to change before clicking.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setGameState("waiting");
    }
  };

  const renderBox = () => {
    switch (gameState) {
      case "waiting":
        return <Text>Click "Start" to begin!</Text>;
      case "ready":
        return <Text>Wait for green...</Text>;
      case "clicked":
        return <Box w="100px" h="100px" bg="green.500" onClick={handleClickBox} cursor="pointer" borderRadius="md" />;
      default:
        return null;
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Center w="100%" h="100px" bg="gray.200" borderRadius="md">
          {renderBox()}
        </Center>
        {gameState !== "clicked" && (
          <Button colorScheme="blue" onClick={handleStart}>
            Start
          </Button>
        )}
        {endTime > 0 && <Text fontSize="xl">Reaction time: {endTime - startTime}ms</Text>}
      </VStack>
    </Container>
  );
};

export default Index;
