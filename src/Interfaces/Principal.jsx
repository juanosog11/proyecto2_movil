import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { estilosPrincipal, estilos_estandar } from './Estilos.jsx';
import NavBar from '../components/Navbar.jsx';

export default function Principal({ navigation, route }){
  const [acciones, setAcciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [usuario, setUsuario] = useState(route.params.usuario);
  const [usuarioLoading, setUsuarioLoading] = useState(true);

  useEffect(() => {
    console.log('Principal');
    console.log('Correo:', usuario.correo);
    console.log('Contraseña:', usuario.contraseña);
  }, [usuario]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const responseUsuario = await fetch(`http://localhost:3001/Usuario/${usuario.id}`);
        const dataUsuario = await responseUsuario.json();
        setUsuario(dataUsuario);
        console.log("principal actualizar", dataUsuario);
        console.log("Usuario", usuario);
      } catch (error) {
        console.error('Error fetching usuario:', error);
      } finally {
        setUsuarioLoading(false);
      }
    };

    fetchUsuario();

  }, [route.params.usuario]); // Utiliza route.params.usuario como dependencia

  useEffect(() => {
    const fetchAcciones = async () => {
      try {
        if (usuarioLoading) return; // Esperar a que termine de cargar el usuario

        const responsePais = await fetch(`http://localhost:3001/Pais/${usuario.pais_id}`);
        const dataPais = await responsePais.json();
        console.log(dataPais.nombre);

        const responseAcciones = await fetch(`https://api-acciones.onrender.com/api/acciones/pais/${dataPais.nombre}`);
        const dataAcciones = await responseAcciones.json();
        console.log(dataAcciones);
        setAcciones(dataAcciones);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcciones();
  }, [usuario.pais_id, usuarioLoading]); 


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={estilosPrincipal.container}>
      <View style={estilosPrincipal.head}>
        <Text style={estilosPrincipal.title}>smartInvest</Text>
        <Image source={require('../images/logo.jpeg')} style={estilosPrincipal.logo} />
      </View>

      <ScrollView style={estilosPrincipal.scrollView}>
        {acciones.map((accion) => (
          <TouchableOpacity key={accion.simbolo} onPress={() => navigation.navigate('Compra', { simbolo: accion.simbolo, usuario })}>
            <View style={estilosPrincipal.accionContainer}>
              <Text style={estilosPrincipal.accionNombre}>{accion.nombre}</Text>
              <Text style={estilosPrincipal.accionPrecio}>Precio: {accion.precio}</Text>
              <Text style={estilosPrincipal.accionCambio}>Cambio: {accion.subida_bajada}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <NavBar navigation={navigation} usuario={usuario} />
    </View>
  );
};


