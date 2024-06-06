import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { estilosPrincipal, estilos_estandar } from './Estilos.jsx';
import NavBar from '../components/Navbar.jsx';

export default function Principal({ navigation, route }){
  const [acciones, setAcciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const { usuario } = route.params;

  // Ahora puedes acceder a los datos del usuario, por ejemplo:
  console.log('Principal');
  console.log('Correo:', usuario.correo);
  console.log('Contraseña:', usuario.contraseña);

  useEffect(() => {
    const fetchAcciones = async () => {
      try {
        const response = await fetch('https://api-acciones.onrender.com/api/acciones');
        const data = await response.json();
        setAcciones(data);
      } catch (error) {
        console.error('Error fetching acciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcciones();
  }, []);

  const handleAccionPress = (simbolo) => {
    // Aquí puedes navegar a otra pantalla pasando el símbolo de la acción como parámetro
    console.log(simbolo)
    navigation.navigate('Compra', { simbolo });
  };

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
          <TouchableOpacity key={accion.simbolo} onPress={() => handleAccionPress(accion.simbolo)}>
            <View style={estilosPrincipal.accionContainer}>
              <Text style={estilosPrincipal.accionNombre}>{accion.nombre}</Text>
              <Text style={estilosPrincipal.accionPrecio}>Precio: {accion.precio}</Text>
              <Text style={estilosPrincipal.accionCambio}>Cambio: {accion.subida_bajada}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <NavBar navigation={navigation} />
    </View>
  );
};


