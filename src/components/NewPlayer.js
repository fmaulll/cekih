import {
  Box,
  Button,
  Container,
  FormControl,
  Text,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playerActions } from "../store/players-slice";

const NewPlayer = () => {
  const dispatch = useDispatch();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [p4, setP4] = useState("");
  const [error, setError] = useState(false);

  const p1Handler = (e) => {
    setP1(e.target.value);
  };
  const p2Handler = (e) => {
    setP2(e.target.value);
  };
  const p3Handler = (e) => {
    setP3(e.target.value);
  };
  const p4Handler = (e) => {
    setP4(e.target.value);
  };

  const submitPlayerHandler = () => {
    if (p1 === "" || p2 === "" || p3 === "" || p4 === "") {
      setError(true);
    } else {
      const playersObject = [
        {
          id: 1,
          name: p1,
          point: 0,
        },
        {
          id: 2,
          name: p2,
          point: 0,
        },
        {
          id: 3,
          name: p3,
          point: 0,
        },
        {
          id: 4,
          name: p4,
          point: 0,
        },
      ];
      const playersStringify = JSON.stringify(playersObject);
      //Insert the stringify players into localstorage
      localStorage.setItem("players", playersStringify);
      //Call the addPlayers function in playerAction
      dispatch(playerActions.addPlayers(playersObject));
      dispatch(playerActions.closeNewGame());
    }
  };
  return (
    <Container
      zIndex="1"
      position="absolute"
      bgColor="rgba(0, 0, 0, 0.2);"
      display="flex"
      justifyContent="center"
      h="100vh"
      alignItems="center"
    >
      <Box
        backgroundColor="white"
        p="5"
        maxW="96"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <FormControl isRequired>
          {error ? (
            <Text color="red" mb="2">
              Please insert all players name
            </Text>
          ) : (
            ""
          )}
          <FormLabel htmlFor="first-name">Player name</FormLabel>
          <Input
            mb="4"
            id="player-name"
            placeholder="Player name"
            onChange={p1Handler}
          />
          <FormLabel htmlFor="first-name">Player name</FormLabel>
          <Input
            mb="4"
            id="player-name"
            placeholder="Player name"
            onChange={p2Handler}
          />
          <FormLabel htmlFor="first-name">Player name</FormLabel>
          <Input
            mb="4"
            id="player-name"
            placeholder="Player name"
            onChange={p3Handler}
          />
          <FormLabel htmlFor="first-name">Player name</FormLabel>
          <Input
            mb="4"
            id="player-name"
            placeholder="Player name"
            onChange={p4Handler}
          />
          <Button onClick={submitPlayerHandler} colorScheme="facebook">
            Play Now!
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default NewPlayer;
