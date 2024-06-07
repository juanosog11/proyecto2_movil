import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleRegistrar = () => {
    console.log('Correo:', correo);
    console.log('Contraseña:', contrasena);
    navigation.navigate('Principal')
  };

  useEffect(() => {
    const fetchAcciones = async () => {
      try {
        const response = await fetch('https://api-acciones.onrender.com/api/acciones/pais');
        const data = await response.json();
        // console.log(data);
        setPaises(data);
      } catch (error) {
        console.error('Error fetching acciones:', error);
      } 
    };

    fetchAcciones();
  }, []);



  useEffect(() => {
    
    if (paises.length === 0) return;

    const llenarPais = async (pais) => {
      try {
        
        const responsePais = await fetch('http://localhost:3001/Pais', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          },
          body: JSON.stringify({ nombre: pais.pais })
        });
        const dataPais = await responsePais.json();
        // console.log(dataPais.id);
        try {
          const resMoneda = await fetch(`https://api-acciones.onrender.com/api/acciones/monedaNombrePais/${pais.pais}`)
          
          const dataMonedaApi = await resMoneda.json()

          llenarMoneda(dataMonedaApi, dataPais.id)


        } catch (error) {
          console.error('Error al hacer Res moneda', error);
        }

      } catch (error) {
        // console.error('Error inserting Moneda y pais:', error);
      }
    };

    const llenarMoneda = async (dataMonedaApi, dataPais) => {
      const dataPasi1 = dataPais
      console.log("datos pais: " + dataPasi1)
      for (const moneda of dataMonedaApi) {
        const nombreMoneda = moneda.nombre_moneda;
        const simboloMoneda = moneda.simbolo_moneda;

        try {
          const responseMoneda = await fetch('http://localhost:3001/Monedas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify({ nombre: nombreMoneda, simbolo: simboloMoneda })
          });
          if (!responseMoneda.ok) {
            throw new Error(`HTTP error! status: ${responseMoneda.status}`);
          }
          const dataMoneda = await responseMoneda.json();
          
          llenarPaisMoneda(dataMoneda.id, dataPasi1)

        } catch (error) {
          console.error('Error al hacer POST a /Monedas:', error);
        }
      }
    }

    const llenarPaisMoneda = async (dataMoneda, dataPais) => {
      console.log("id pais pm " + dataPais);
      console.log("id Moneda pm " + dataMoneda);
      
      
      try {
        const responsePaisMoneda = await fetch('http://localhost:3001/Moneda_pais', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pais_id: dataPais, Moneda_id: dataMoneda })
        });

        if (!responsePaisMoneda.ok) {
          console.log(responsePaisMoneda)
        }
        const dataPaisMoneda = await responsePaisMoneda.json();
        console.log("Pais Moneda "+dataPaisMoneda.id);
      } catch (error) {
        console.error('Error al hacer POST a /PaisMonedas:', error);
      }
    }

    paises.forEach((pais) => {
      // console.log(pais);
      llenarPais(pais);
    });
  }, [paises]);

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
        <Text style={principal.title}>Correo</Text>
        <TextInput style={principal.input} name="Correo" onChangeText={setCorreo} placeholder='Correo' keyboardType='email-address' />
        <Text style={principal.title}>Contraseña</Text>
        <TextInput style={principal.input} name="Contraseña" onChangeText={setContrasena} placeholder='Contraseña' secureTextEntry />

        <View style={principal.buttonContainer}>
          <Button title='Inicio' onPress={handleRegistrar} style={principal.button} />
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
