import React, { useState, useEffect } from 'react';
import { Button, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { estilosPerfil, estilos_estandar, navbar } from './Estilos.jsx'; // Asegúrate de importar los estilos de navbar
import NavBar from '../components/Navbar.jsx';

export default function Perfil({ navigation, route }) {
  const [pais, setPaises] = useState('');
  const [acciones, setAcciones] = useState('');


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
      const BuscarAcc = await fetch(`http://localhost:3001/UsuarioAccionCan/${usuario.id}`);
      const datacant = await BuscarAcc.json();
      setAcciones(datacant);
      console.log('cantidad: ', datacant); // Asegúrate de usar el nombre correcto de la variable aquí
    } catch (error) {

    }
  };

  useEffect(() => {
    PaisB();
    Accion();
  }, []);

  return (
    <View style={estilos_estandar.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}> {/* Ajuste aquí */}
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
          <View style={estilosPerfil.buttonContainer}>
            <Button
              title="Modificar Informacion"
              onPress={() => navigation.navigate('Modificar', { usuario })}
              style={estilosPerfil.button}
            />
          </View>
        </View>
      </ScrollView>
      <NavBar navigation={navigation} usuario={usuario} />
    </View>
  );
}