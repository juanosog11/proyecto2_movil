import React from 'react';
import { Text, View, Image, TextInput, Button, ScrollView } from 'react-native';
import { estilos_estandar, EstiloModificar } from './Estilos.jsx';

export default function Modificar ({navigation}){
    return (
      <ScrollView style={estilos_estandar.container}>
        <View style={estilos_estandar.head}>
          <Text style={estilos_estandar.title}>SmartInvest</Text>
          <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
        </View>
      </ScrollView>
    );
}