import React, { useState, useEffect } from 'react';
import { Button, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { estilosPerfil, estilos_estandar } from "./Estilos.jsx";
import NavBar from '../components/Navbar.jsx';

export default function Perfil({ navigation, route }) {

  const [imagen,setImagen] = useState('');
  const [nombre,setNombre] = useState('');
  const [pais,setPaises] = useState('');
  const [acciones, setAcciones] = useState('');
  const [saldo,setSaldo] = useState('');
  const [correo,setCorreo] = useState('');
  const [numero, setNumero] = useState('');

  const handlePerfil = async () =>{
    try{
    console.log(usuario)
    const MostrarUsuario = await fetch('http://localhost:3001/Usuario',{
    method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: JSON.stringify(usuario),
        });

        const dataU = await MostrarUsuario.json();
        setImagen(dataU.imagen);
        setNombre(dataU.nombre);
        setPaises(dataU.pais);
        setAcciones(dataU.acciones);
        setSaldo(dataU.saldo);
        setCorreo(dataU.correo);
        setNumero(dataU.numero);

        console.log(dataU)

    }catch(error){

    }
    console.log(dataU);
  }

  useEffect(() => {
    handlePerfil();
  }, []);

  const { usuario } = route.params;
  console.log('Perfil:', JSON.stringify(usuario));

    return (
      <ScrollView>
        <View style={estilos_estandar.container}>
          <View style={estilos_estandar.head}>
            <Text style={estilos_estandar.title}>smartInvest</Text>
            <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
          </View>
          <View style={estilosPerfil.form}>
            <Image source={require('../images/images (2).jpeg')} style={estilosPerfil.logo} />
            <Text style={estilosPerfil.title}>Datos del Usuario</Text>
            <View style={estilosPerfil.userData}>
              <Text style={estilosPerfil.userDataLabel}>Nombre y apellidos:</Text>
              <Text>{nombre}</Text>
            </View>
            <View style={estilosPerfil.userData}>
              <Text style={estilosPerfil.userDataLabel}>País:</Text>
              <Text>{pais}</Text>
            </View>
            <View style={estilosPerfil.userData}>
              <Text style={estilosPerfil.userDataLabel}>Acciones:</Text>
              <Text>{acciones}</Text>
            </View>
            <View style={estilosPerfil.userData}>
              <Text style={estilosPerfil.userDataLabel}>Saldo:</Text>
              <Text>${saldo}</Text>
            </View>
            <View style={estilosPerfil.userData}>
              <Text style={estilosPerfil.userDataLabel}>Correo:</Text>
              <Text>{correo}</Text>
            </View>
            <View style={estilosPerfil.userData}>
              <Text style={estilosPerfil.userDataLabel}>Número:</Text>
              <Text>+{numero}</Text>
            </View>

            <View style={estilosPerfil.buttonContainer}>
              <Button
                title='Modificar Informacion'
                onPress={() => navigation.navigate('Modificar',{usuario})} style={estilosPerfil.button}
              ></Button>
            </View>
          </View>
          <NavBar navigation={navigation} usuario={usuario} />
        </View>
      </ScrollView>
    );
}
