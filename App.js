import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Interfaces/Inicio.jsx';
import Perfil from './src/Interfaces/Perfil.jsx'
import Registrar from './src/Interfaces/Registrar.jsx';
import Inicio from './src/Interfaces/Inicio.jsx'
import Principal from './src/Interfaces/Principal.jsx';
import Compra from "./src/Interfaces/Compra.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Perfil' component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name='Registrar' component={Registrar} options={{ headerShown: false }} />
        <Stack.Screen name='Inicio' component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name='Principal' component={Principal} options={{ headerShown: false }} />
        <Stack.Screen name='Compra' component={Compra} options={{ headerShown: false }} />
        <Stack.Screen name='Modificar' component={Modificar} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
