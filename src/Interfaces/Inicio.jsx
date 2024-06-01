import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TextInput, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { estilos_estandar, principal } from "./Estilos"; // Cambiado a Estilos

const { width } = Dimensions.get('window');

const sliderData = [
  {
    text: 'Bienvenido a smartInvest',
    // image: require('../images/slide1.jpeg')
  },
  {
    text: 'Invierte con Inteligencia',
    // image: require('../images/slide2.jpeg')
  },
  {
    text: 'Gana Más con Menos Esfuerzo',
    // image: require('../images/slide3.jpeg')
  }
];

export default function HomeScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1));
    }, 6000); // Cambia el slide cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: currentIndex * width, animated: true });
  }, [currentIndex]);

  const scrollViewRef = React.useRef(null);

  return (
    <View style={estilos_estandar.container}>
      <View style={estilos_estandar.head}>
        <Text style={estilos_estandar.title}>smartInvest</Text>
        <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
      </View>

      {/* Slider */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={estilos_estandar.sliderContainer}
        contentContainerStyle={estilos_estandar.sliderContentContainer}
      >
        {sliderData.map((item, index) => (
          <View key={index} style={[estilos_estandar.slide, { width: width }]}>
            {/* <Image source={item.image} style={estilos_estandar.slideImage} /> */}
            <Text style={estilos_estandar.slideText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Formulario de inicio de sesión */}
      <View style={principal.form}>
        <Text style={EstiloRegistro.title}>Correo</Text>
        <TextInput style={EstiloRegistro.input} name="Correo" placeholder='Correo' keyboardType='email-address' />
        <Text style={EstiloRegistro.title}>Contraseña</Text>
        <TextInput style={EstiloRegistro.input} name="Contraseña" placeholder='Contraseña' secureTextEntry />

        <View style={principal.buttonContainer}>
          <Button title='Inicio' onPress={() => navigation.navigate('Principal')} style={principal.button} />
          <Button title='Registrar' onPress={() => navigation.navigate('Registrar')} style={principal.button} />
        </View>

        <View style={principal.buttonContainer}>
          <TouchableOpacity
            title=''
            style={principal.buttonRedes}
            onPress={() => console.log('Botón de Facebook presionado')}
          >
            <Icon name='logo-facebook' size={24} color='#3b5998' />
          </TouchableOpacity>

          <TouchableOpacity style={principal.buttonRedes} onPress={() => console.log('Botón de Twitter presionado')}>
            <Icon name='logo-twitter' size={24} color='#1da1f2' />
          </TouchableOpacity>

          <TouchableOpacity style={principal.buttonRedes} onPress={() => console.log('Botón de Google presionado')}>
            <Icon name='logo-google' size={24} color='#db4437' />
          </TouchableOpacity>
        </View>
      </View>

      
    </View>
  );
}
