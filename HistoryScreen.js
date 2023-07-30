//historyscreen.js
/////////////////////////
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useContext } from 'react';
import GameContext from './GameContext';


const HistoricoScreen = () => {
  const { gameHistory } = useContext(GameContext); // Usando o contexto

  const renderGame = ({ item }) => {
    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameText}>{`${item.player1Name} vs. ${item.player2Name}`}</Text>
        <Text style={styles.gameResultText}>{`Resultado: ${item.result}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Jogos</Text>
      <FlatList
        data={gameHistory}
        renderItem={renderGame}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  gameContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  gameText: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
  },
  gameResultText: {
    fontSize: 18,
    color: 'green',
  },
});

export default HistoricoScreen;
