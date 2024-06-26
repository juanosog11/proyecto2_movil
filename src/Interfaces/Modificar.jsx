import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SelectInput from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import { EstiloModificar, EstiloRegistro, estilosPerfil, estilos_estandar } from './Estilos.jsx';
import { Picker } from '@react-native-picker/picker';

export default function Modificar({ navigation, route }) {
  
  const [usuario, setUsuario] = useState(route.params.usuario);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPais, setSelectedPais] = useState('');
  const [paises, setPaises] = useState([]);
  const [nombre, setNombre] = useState(usuario.nombre);
  const [contrasena, setContrasena] = useState(usuario.contraseña);
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

  const handleModificar = async () => {
    var id = 0
    if (selectedPais === '') {
      id = usuario.pais_id
    }
    else {
      id = await handlePais()
      console.log("id", id)
    }
   
    try {
      const update = await fetch(`http://localhost:3001/Usuario/${usuario.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pais_id: id,
          nombre: nombre,
          contraseña: contrasena,
        }),
      });
      console.log(update)
      const usuario2 = await update.json()
      console.log(usuario2)
      navigation.navigate('Principal', { usuario2 });
    } catch (error) {

    }
  };

  const handlePais = async () => {
    try {
      // Obtener el id del país seleccionado
      const CallidPais = await fetch(`http://localhost:3001/Paisn/${selectedPais}`);
      const dataPais = await CallidPais.json();
      const idPais = dataPais.id;
      console.log('ID del país:', idPais);
      return idPais
    } catch (error) {
      console.error('Error al registrar usuario', error);
      return ""
    }
  };

  const handleImagePress = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setSelectedImage(source);
      }
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  return (
    <ScrollView style={estilos_estandar.container}>
      <View style={estilos_estandar.head}>
        <Text style={estilos_estandar.title}>SmartInvest</Text>
        <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
      </View>

      <View style={EstiloModificar.container}>
        <Text style={estilosPerfil.title}>Modificar Datos</Text>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={selectedImage || require('../images/images (2).jpeg')} style={EstiloModificar.logo} />
        </TouchableOpacity>
        <View style={EstiloModificar.caja}>
          <Text style={EstiloModificar.title}>Pais</Text>
          <View style={EstiloModificar.comboBox}>
            <View style={EstiloModificar.comboBox}>
              <Picker
                style={EstiloModificar.picker}
                selectedValue={selectedPais}
                onValueChange={(itemValue) => setSelectedPais(itemValue)}
              >
                <Picker.Item label='Seleccione el país' value='' />
                {paises.map((pais, index) => (
                  <Picker.Item key={index} label={pais.pais} value={pais.pais} />
                ))}
              </Picker>
            </View>
          </View>
          <Text style={EstiloModificar.title}>Nombre</Text>
          <TextInput
            style={EstiloModificar.input}
            placeholder='Nombre'
            keyboardType='default'
            value={nombre}
            onChangeText={setNombre}
          />
          <Text style={EstiloModificar.title}>Contraseña</Text>
          <TextInput
            style={EstiloModificar.input}
            placeholder='Contraseña'
            keyboardType='default'
            value={contrasena}
            onChangeText={setContrasena}
          />
        </View>
      </View>

      <View style={EstiloRegistro.buttonContainer}>
        <Button title='Aceptar' onPress={handleModificar} style={EstiloRegistro.button}></Button>
        <Button
          title='Cancelar'
          onPress={() => navigation.navigate('Principal', { usuario })}
          style={EstiloRegistro.button}
        ></Button>
      </View>
    </ScrollView>
  );
}
