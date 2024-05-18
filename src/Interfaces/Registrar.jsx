import React from 'react';
import { Text, View, Image, TextInput, Button, CheckBox, ScrollView } from 'react-native';
import { estilos_estandar, EstiloRegistro } from './Estilos.jsx';

export default function Registrar({ navigation }) {
  return (
    <ScrollView style={estilos_estandar.container}>
      <View style={estilos_estandar.head}>
        <Text style={estilos_estandar.title}>SmartInvest</Text>
        <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
      </View>

      <View style={EstiloRegistro.form}>
        <Text style={EstiloRegistro.title}>Edad</Text>
        <TextInput style={EstiloRegistro.input} />
        <Text style={EstiloRegistro.title}>Nombre</Text>
        <TextInput style={EstiloRegistro.input} />
        <Text style={EstiloRegistro.title}>Telefono</Text>
        <TextInput style={EstiloRegistro.input} />
        <Text style={EstiloRegistro.title}>Pais</Text>
        <TextInput style={EstiloRegistro.input} />
        <Text style={EstiloRegistro.title}>Correo</Text>
        <TextInput style={EstiloRegistro.input} />
        <Text style={EstiloRegistro.title}>Contraseña</Text>
        <TextInput style={EstiloRegistro.input} />

        <View style={EstiloRegistro.buttonContainer}>
          <Button title='Cancelar' onPress={() => navigation.navigate('Inicio')} style={EstiloRegistro.button}></Button>
          <Button title='Registrar' onPress={() => navigation.navigate('Principal')}style={EstiloRegistro.button}></Button>
        </View>
      </View>
    </ScrollView>
  );
} 
