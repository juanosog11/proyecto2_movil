import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import { estilos_estandar, EstiloRegistro } from './Estilos.jsx';
import { Picker } from '@react-native-picker/picker';


export default function Registrar({ navigation }) {
  const [paises, setPaises] = useState([]);
  const [selectedPais, setSelectedPais] = useState('');
  const [edad, setEdad] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(true);







  useEffect(() => {
    const fetchAcciones = async () => {
      try {
        const response = await fetch('https://api-acciones.onrender.com/api/acciones/pais');
        const data = await response.json();
        console.log(data);
        setPaises(data);
      } catch (error) {
        console.error('Error fetching acciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcciones();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleRegistrar = async () => {
    try {
      // Obtener el id del país seleccionado
      const CallidPais = await fetch(`http://localhost:3001/Paisn/${selectedPais}`);
      const dataPais = await CallidPais.json();
      const idPais = dataPais.id;
      console.log("ID del país:", idPais);

      // Crear el objeto usuario
      const usuario = {
        nombre: nombre,
        pais_id: idPais,
        saldo: saldo,
        correo: correo,
        contraseña: contrasena,  // Corregido typo aquí
        imagen: imagen,
      };
      console.log("Usuario a crear:", usuario);

      // Enviar solicitud para crear el usuario
      const CrearUsuario = await fetch('http://localhost:3001/Usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: JSON.stringify(usuario),
      });
      const dataUsuario = await CrearUsuario.json();
      console.log("Respuesta del servidor:", dataUsuario);
      navigation.navigate('Principal', { usuario: usuario });


    } catch (error) {
      console.error('Error al registrar usuario', error);
      return false;
    }


    
      
    
  };

  return (
    <ScrollView style={estilos_estandar.container}>
      <View style={estilos_estandar.head}>
        <Text style={estilos_estandar.title}>SmartInvest</Text>
        <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
      </View>

      <View style={EstiloRegistro.form}>
        <Text style={EstiloRegistro.title}>Edad</Text>
        <TextInput
          style={EstiloRegistro.input}
          placeholder='Edad'
          keyboardType='number-pad'
          value={edad}
          onChangeText={setEdad}
        />
        <Text style={EstiloRegistro.title}>Nombre</Text>
        <TextInput
          style={EstiloRegistro.input}
          placeholder='Nombre'
          keyboardType='default'
          value={nombre}
          onChangeText={setNombre}
        />
        <Text style={EstiloRegistro.title}>Teléfono</Text>
        <TextInput
          style={EstiloRegistro.input}
          placeholder='Teléfono'
          keyboardType='number-pad'
          value={telefono}
          onChangeText={setTelefono}
        />
        <Text style={EstiloRegistro.title}>País</Text>
        <View style={EstiloRegistro.input}>
          <Picker
            selectedValue={selectedPais}
            onValueChange={(itemValue, itemIndex) => setSelectedPais(itemValue)}
          >
            <Picker.Item label="Seleccione el país" value="" />
            {paises.map((pais, index) => (
              <Picker.Item key={index} label={pais.pais} value={pais.pais} />
            ))}
          </Picker>
        </View>
        <Text style={EstiloRegistro.title}>Correo</Text>
        <TextInput
          style={EstiloRegistro.input}
          placeholder='Correo'
          keyboardType='email-address'
          value={correo}
          onChangeText={setCorreo}
        />
        <Text style={EstiloRegistro.title}>Contraseña</Text>
        <TextInput
          style={EstiloRegistro.input}
          placeholder='Contraseña'
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />

        <View style={EstiloRegistro.buttonContainer}>
          <Button title='Cancelar' onPress={() => navigation.navigate('Inicio')} style={EstiloRegistro.button}></Button>
          <Button title='Registrar' onPress={handleRegistrar} style={EstiloRegistro.button}></Button>
        </View>
      </View>
    </ScrollView>
  );
} 
