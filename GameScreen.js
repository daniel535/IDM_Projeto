//gamescreen.js
//////////////////////
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useContext, useEffect } from 'react';
import GameContext from './GameContext';

const ROWS = 6;
const COLS = 7;
const EMPTY = ' ';
const PLAYER1 = '🟡';
const PLAYER2 = '🔴';

const initialState = (player1Name, player2Name) => ({
  board: Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => EMPTY)),
  currentPlayer: PLAYER1,
  winner: null,
  players: {
    player1Name: player1Name,
    player2Name: player2Name,
  },
});

const JogoScreen = ({ route, navigation }) => {
  const { player1Name, player2Name } = route.params;
  const [state, setState] = useState(initialState(player1Name, player2Name));
  const { gameHistory, setGameHistory } = useContext(GameContext); // Usando o contexto

  useEffect(() => {
    if (state.winner) {
      const result =
        state.winner === PLAYER1
          ? `${state.players.player1Name} wins!`
          : `${state.players.player2Name} wins!`;

      // Armazenando os dados do jogo no histórico
      setGameHistory(prevHistory => [
        ...prevHistory,
        { player1Name, player2Name, result },
      ]);
    }
  }, [state.winner, player1Name, player2Name, setGameHistory]);

  const resetHome = () => {
    navigation.popToTop('HomeScreen'); // Volta para a tela inicial (HomeScreen)
  };
  const onColumnPress = (col) => {
    if (state.winner || isColumnFull(col)) return;

    const boardCopy = state.board.map(row => [...row]);
    let row = ROWS - 1;
    while (row >= 0 && boardCopy[row][col] !== EMPTY) {
      row--;
    }
    if (row >= 0) {
      boardCopy[row][col] = state.currentPlayer;
      const winner = checkWinner(boardCopy, row, col);
      setState({
        board: boardCopy,
        currentPlayer: state.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1,
        winner: winner,
        players: state.players,
      });
    }
  };

  const isColumnFull = (col) => {
    return state.board[0][col] !== EMPTY;
  };

  const checkWinner = (board, row, col) => {
    const directions = [
      [1, 0], // horizontal
      [0, 1], // vertical
      [1, 1], // diagonal down-right
      [-1, 1], // diagonal up-right
    ];

    for (const [dr, dc] of directions) {
      let count = 1;
      count += countTokens(board, row, col, dr, dc);
      count += countTokens(board, row, col, -dr, -dc);

      if (count >= 4) {
        return state.currentPlayer;
      }
    }

    return null;
  };

  const countTokens = (board, row, col, dr, dc) => {
    const currentPlayer = state.currentPlayer;
    let r = row + dr;
    let c = col + dc;
    let count = 0;

    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
      count++;
      r += dr;
      c += dc;
    }

    return count;
  };

  const resetGame = () => {
    setState(initialState(player1Name, player2Name));
  };

  const renderCell = (row, col) => {
    return (
      <TouchableOpacity key={col} style={styles.cell} onPress={() => onColumnPress(col)}>
        <Text style={styles.cellText}>{state.board[row][col]}</Text>
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    return (
      <View style={styles.board}>
        {state.board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((col, colIndex) => renderCell(rowIndex, colIndex))}
          </View>
        ))}
      </View>
    );
  };

  const renderStatus = () => {
    if (state.winner) {
      return (
        <Text style={styles.statusText}>
          {state.winner === PLAYER1 ? `${state.players.player1Name} wins!` : `${state.players.player2Name} wins!`}
        </Text>
      );
    } else if (state.board.flat().every(token => token !== EMPTY)) {
      return <Text style={styles.statusText}>Empate</Text>;
    } else {
      return (
        <Text style={styles.statusText}>
          {state.currentPlayer === PLAYER1 ? `${state.players.player1Name}'s turn` : `${state.players.player2Name}'s turn`}
        </Text>
      );
    }
  };

  const goToHistory = () => {
    navigation.navigate('Historico');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.board}>{renderBoard()}</View>
      <View style={styles.status}>{renderStatus()}</View>
      <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
        <Text style={styles.restartButtonText}>Recomeçar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.historyButton} onPress={goToHistory}>
        <Text style={styles.historyButtonText}>Ver Histórico</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  cellText: {
    fontSize: 30,
  },
  status: {
    marginTop: 20,
    marginBottom: 40,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  restartButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
  },
  historyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JogoScreen;
