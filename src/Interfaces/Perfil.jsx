import React, { useState, useEffect } from 'react';
import { Button, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { estilosPerfil, estilos_estandar } from './Estilos.jsx';
import NavBar from '../components/Navbar.jsx';

export default function Perfil({ navigation, route }) {
  const [imagen, setImagen] = useState('');
  const [nombre, setNombre] = useState('');
  const [pais, setPaises] = useState('');
  const [acciones, setAcciones] = useState('');
  const [saldo, setSaldo] = useState('');
  const [correo, setCorreo] = useState('');
  const [numero, setNumero] = useState('');

  const datosU = route.params.usuario;
  console.log(datosU);
  const usuario = datosU;
  console.log('acciones usuario', usuario.id);

  const PaisB = async () => {
    try {
      const BuscarPais = await fetch(`http://localhost:3001/Pais/${usuario.pais_id}`);
      const dataPais = await BuscarPais.json();
      const nomPais = dataPais.nombre;
      console.log('nombre del país:', nomPais);
      setPaises(nomPais);
    } catch (error) {

    }
  };

  const Accion = async () => {
    try {
      const BuscarAcc = await fetch(`http://localhost:3001/UsuarioAccionCan/${usuario.id}`)
      const datacant = await BuscarAcc.json();
      setAcciones(datacant);
      console.log('cantidad: ', cant);
    } catch (error) {

    }
  }

  useEffect(() => {
    PaisB();
    Accion(); // Llamar a la función cuando se monte el componente
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <Text>{usuario.nombre}</Text>
          </View>
          <View style={estilosPerfil.userData}>
            <Text style={estilosPerfil.userDataLabel}>País:</Text>
            <Text>{pais}</Text>
          </View>
          <View style={estilosPerfil.userData}>
            <Text style={estilosPerfil.userDataLabel}>Acciones:</Text>
            <View>
              {Array.isArray(acciones) && acciones.length > 0 ? (
                acciones.map((accion, index) => <Text key={index}>{accion.total_acciones}</Text>)
              ) : (
                <Text>No hay acciones disponibles</Text>
              )}
            </View>
          </View>
          <View style={estilosPerfil.userData}>
            <Text style={estilosPerfil.userDataLabel}>Saldo:</Text>
            <Text>${usuario.saldo}</Text>
          </View>
          <View style={estilosPerfil.userData}>
            <Text style={estilosPerfil.userDataLabel}>Correo:</Text>
            <Text>{usuario.correo}</Text>
          </View>
          <View style={estilosPerfil.userData}>
            <Text style={estilosPerfil.userDataLabel}>Número:</Text>
            <Text>{usuario.numero}</Text>
          </View>

          <View style={estilosPerfil.buttonContainer}>
            <Button
              title='Modificar Informacion'
              onPress={() => navigation.navigate('Modificar', { usuario })}
              style={estilosPerfil.button}
            ></Button>
          </View>
        </View>
      </ScrollView>
      <NavBar navigation={navigation} usuario={usuario} />
    </View>

  );
}
