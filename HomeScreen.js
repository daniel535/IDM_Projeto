//HomeScreen.js
//////////
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const onStartGame = () => {
    if (player1Name.trim() === '' || player2Name.trim() === '') {
      alert('Por favor, insira os nomes de ambos os jogadores antes de iniciar o jogo.');
      return;
    }
    navigation.navigate('Jogo', {
      player1Name,
      player2Name,
    });
  };

  const onViewHistory = () => {
    navigation.navigate('Historico');
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.menuTitle}>4 em Linha</Text>
        <Image source={require('./assets/connect-4-rules.jpg')} style={styles.logo} />
        <View style={styles.playerNameInput}>
          <TextInput
            style={styles.input}
            onChangeText={text => setPlayer1Name(text)}
            value={player1Name}
            placeholder="Insira o nome do Jogador 1"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.playerNameInput}>
          <TextInput
            style={styles.input}
            onChangeText={text => setPlayer2Name(text)}
            value={player2Name}
            placeholder="Insira o nome do Jogador 2"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.startButton, styles.buttonMargin]} onPress={onStartGame}>
            <Text style={styles.startButtonText}>Iniciar Jogo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.startButton,styles.buttonMargin]} onPress={onViewHistory}>
            <Text style={styles.startButtonText}>Histórico</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  menuTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'blue',
  },
  playerNameInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    marginHorizontal: 10,
    flex: 1,
    fontSize: 16,
    borderRadius: 20,
    maxWidth: 250,
  },
  startButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonMargin: {
    marginHorizontal: 10,
  },
});

export default HomeScreen;
