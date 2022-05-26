import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../store/players-slice";
import NewGameModal from "./NewGameModal";
import NewPlayer from "./NewPlayer";

const PlayCekih = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);
  const show = useSelector((state) => state.players.isShow);
  const showNewGameModal = useSelector(
    (state) => state.players.isShowNewGameModal
  );
  const [playerId, setPlayerId] = useState("");
  const [point, setPoint] = useState("");
  const [error, setError] = useState(false);

  const addPointHandler = () => {
    if (point === "") {
      setError(true);
    } else {
      //Localstorage dont keep object, they only keep stringify object
      const playerStringify = localStorage.getItem("players");
      //parse the stringify object into object
      const playerObject = JSON.parse(playerStringify);
      //Find the index base on the id
      const playerIndex = playerObject.findIndex(
        (player) => player.id === playerId
      );
      //Select the object.point base on the index from playerIndex variable and add sum by point from the useState
      playerObject[playerIndex].point += parseInt(point);
      //Call the addPoint function in playerActions and give payload
      dispatch(playerActions.addPoint({ id: playerId, point: point }));
      //Clear the localstorage and replace it with new object
      localStorage.clear("players");
      localStorage.setItem("players", JSON.stringify(playerObject));
      //Set the input value into empty string
      setPoint("");
    }
  };

  const minusPointHandler = () => {
    if (point === "") {
      setError(true);
    } else {
      const playerStringify = localStorage.getItem("players");
      const playerObject = JSON.parse(playerStringify);
      const playerIndex = playerObject.findIndex(
        (player) => player.id === playerId
      );
      playerObject[playerIndex].point -= parseInt(point);
      dispatch(playerActions.minusPoint({ id: playerId, point: point }));
      localStorage.clear("players");
      localStorage.setItem("players", JSON.stringify(playerObject));
      setPoint("");
    }
  };

  const newGameHandler = () => {
    dispatch(playerActions.showNewGameModal());
  };

  useEffect(() => {
    if (localStorage.getItem("players") === null) {
      dispatch(playerActions.showNewGame());
    } else {
      dispatch(playerActions.closeNewGame());
      const playersStringify = localStorage.getItem("players");
      const playersObject = JSON.parse(playersStringify);
      dispatch(playerActions.replacePlayers(playersObject));
    }
  }, []);

  return (
    <>
      {show ? <NewPlayer /> : ""}
      {showNewGameModal ? <NewGameModal /> : ""}
      <Container
        w="100%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Text mt="2">-- Don't forget to select the player --</Text>
        {players.map((player) => (
          <Box
            mt="4"
            display="flex"
            justifyContent="space-between"
            w="95%"
            backgroundColor={player.id === playerId ? "blue.600" : "white"}
            color={player.id === playerId ? "white" : "black"}
            p="5"
            maxW="96"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            key={player.id}
            onClick={() => {
              setPlayerId(player.id);
            }}
          >
            <Text fontSize="lg">{player.name}</Text>
            <Text fontSize="lg" fontWeight="bold">
              {player.point}
            </Text>
          </Box>
        ))}
        <Box
          display="flex"
          mt="4"
          justifyContent="center"
          w="95%"
          backgroundColor="white"
          p="5"
          maxW="96"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <FormControl>
            <Input
              textAlign="center"
              type="number"
              placeholder={error ? "Input number is empty!" : "Insert number"}
              borderColor={error ? "red" : "gray.200"}
              value={point}
              onClick={() => {
                setError(false);
              }}
              onChange={(e) => {
                e.preventDefault();
                setPoint(e.target.value);
              }}
            />
            <Box display="flex" mt="4" justifyContent="center" w="100%">
              <Button
                colorScheme="facebook"
                mr="2"
                py="10"
                w="50%"
                fontSize="6xl"
                type="submit"
                onClick={addPointHandler}
              >
                +
              </Button>
              <Button
                colorScheme="facebook"
                ml="2"
                py="10"
                w="50%"
                fontSize="6xl"
                type="submit"
                onClick={minusPointHandler}
              >
                -
              </Button>
            </Box>
          </FormControl>
        </Box>
        <Button
          mt="4"
          colorScheme="facebook"
          py="10"
          w="95%"
          fontSize="3xl"
          onClick={newGameHandler}
        >
          New Game
        </Button>
      </Container>
    </>
  );
};

export default PlayCekih;
