// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import JogoScreen from './GameScreen';
import HistoricoScreen from './HistoryScreen';
import { GameProvider } from './GameContext'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Jogo"
          component={JogoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Historico"
          component={HistoricoScreen}
          options={{ headerTitle: 'Histórico de Jogos' }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
};

export default App;

