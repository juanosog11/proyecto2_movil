import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { estilos_estandar } from './Estilos.jsx';
import NavBar from '../components/Navbar.jsx';

export default function Principal({ navigation }) {
  return (
    <View style={estilos_estandar.container}>
      <View style={estilos_estandar.head}>
        <Text style={estilos_estandar.title}>SmartInvest</Text>
        <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
      </View>
      <ScrollView contentContainerStyle={estilos_estandar.contentContainer}>
        {/* Aquí va el contenido principal */}
      </ScrollView>
      <NavBar navigation={navigation} />
    </View>
  );
}
