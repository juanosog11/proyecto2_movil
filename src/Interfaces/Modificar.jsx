import React,  { useState } from 'react';
import { Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SelectInput from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import { EstiloModificar, EstiloRegistro, estilosPerfil, estilos_estandar} from './Estilos.jsx';
const Paises = [
  { label: 'Argentina', value: '0' },
  { label: 'Bolivia', value: '1' },
  { label: 'Brasil', value: '2' },
];
export default function Modificar ({navigation}){

  const [selectedImage, setSelectedImage] = useState(null);

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
              <SelectInput
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: 'Selecciona un pais', value: null }}
                items={Paises}
                
              />
            </View>
            <Text style={EstiloModificar.title}>Numero</Text>
            <TextInput style={EstiloModificar.input} />
            <Text style={EstiloModificar.title}>Correo</Text>
            <TextInput style={EstiloModificar.input} />
          </View>
        </View>

        <View style={EstiloRegistro.buttonContainer}>
          <Button
            title='Aceptar'
            onPress={() => navigation.navigate('Principal')}
            style={EstiloRegistro.button}
          ></Button>
          <Button title='Cancelar' onPress={() => navigation.navigate('Perfil')} style={EstiloRegistro.button}></Button>
        </View>
      </ScrollView>
    );
}