import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, Button, ScrollView } from 'react-native';
import { estilos_estandar, EstiloRegistro } from './Estilos.jsx';
import { Picker } from '@react-native-picker/picker';


export default function Registrar({ navigation }) {
  const [selectedPais, setSelectedPais] = useState([]);


  useEffect(() => {
    const fetchAcciones = async () => {
      try {
        const response = await fetch('https://api-acciones.onrender.com/api/acciones/pais');
        
        const data = await response.json();
        console.log(data) 
        setSelectedPais(data);
      } catch (error) {
        console.error('Error fetching acciones:', error);
      } 
    };

    fetchAcciones();
  }, []);

  return (
    <ScrollView style={estilos_estandar.container}>
      <View style={estilos_estandar.head}>
        <Text style={estilos_estandar.title}>SmartInvest</Text>
        <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
      </View>

      <View style={EstiloRegistro.form}>
        <Text style={EstiloRegistro.title}>Edad</Text>
        <TextInput style={EstiloRegistro.input} name="edad" placeholder='Edad' keyboardType='number-pad' />
        <Text style={EstiloRegistro.title}>Nombre</Text>
        <TextInput style={EstiloRegistro.input} name="Nombre" placeholder='Nombre' keyboardType='default' />
        <Text style={EstiloRegistro.title}>Telefono</Text>
        <TextInput style={EstiloRegistro.input} name="Telefono" placeholder='Telefono' keyboardType='number-pad' />
        <Text style={EstiloRegistro.title}>Pais</Text>
        <View style={EstiloRegistro.input}>
          <Picker
            selectedValue={selectedPais}
            onValueChange={(itemValue, itemIndex) => setSelectedPais(itemValue)}
          >
            <Picker.Item label="Seleccione el país" value="" />
            {selectedPais.map((pais, index) => (
              <Picker.Item key={index} label={pais.pais} value={pais.pais} />
            ))}
          </Picker>
        </View>
        <Text style={EstiloRegistro.title}>Correo</Text>
        <TextInput style={EstiloRegistro.input} name="Correo" placeholder='Correo' keyboardType='email-address' />
        <Text style={EstiloRegistro.title}>Contraseña</Text>
        <TextInput style={EstiloRegistro.input} name="Contraseña" placeholder='Contraseña' secureTextEntry />
        <View style={EstiloRegistro.buttonContainer}>
          <Button title='Cancelar' onPress={() => navigation.navigate('Inicio')} style={EstiloRegistro.button}></Button>
          <Button title='Registrar' onPress={() => navigation.navigate('Principal')} style={EstiloRegistro.button}></Button>
        </View>
      </View>
    </ScrollView>
  );
} 
