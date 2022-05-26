import { Box, Button, Container, FormControl, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { playerActions } from "../store/players-slice";

const NewGameModal = () => {
  const dispatch = useDispatch();
  return (
    <Container
      zIndex="1"
      position="absolute"
      bg="rgba(0, 0, 0, 0.2);"
      display="flex"
      justifyContent="center"
      h="100vh"
      alignItems="center"
      maxW="full"
    >
      <Box
        backgroundColor="white"
        maxW="96"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <FormControl
          p="10"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text fontWeight="bold" fontSize="2xl">
            Janji ga kepencet ?
          </Text>
          <Box mt="4">
            <Button
              mr="2"
              fontSize="2xl"
              onClick={() => {
                localStorage.clear("players");
                dispatch(playerActions.closeNewGameModal());
                dispatch(playerActions.showNewGame());
              }}
              colorScheme="facebook"
            >
              Yes
            </Button>
            <Button
              ml="2"
              fontSize="2xl"
              onClick={() => {
                dispatch(playerActions.closeNewGameModal());
              }}
              colorScheme="facebook"
            >
              No
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
};

export default NewGameModal;
