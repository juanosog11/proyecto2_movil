import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { estilosPrincipal } from './Estilos.jsx';
import NavBar from '../components/Navbar.jsx';

const Ventas = ({ navigation }) => {
    const [accionesCompradas, setAccionesCompradas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccionesCompradas = async () => {
            try {
                const response = await fetch('https://api-acciones.onrender.com/api/acciones_compradas'); // Reemplaza con la URL adecuada
                const data = await response.json();
                setAccionesCompradas(data);
            } catch (error) {
                console.error('Error fetching acciones compradas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccionesCompradas();
    }, []);

    const handleAccionPress = (simbolo) => {
        navigation.navigate('Venta', { simbolo });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={estilosPrincipal.container}>
            <View style={estilosPrincipal.head}>
                <Text style={estilosPrincipal.title}>Mis Acciones</Text>
            </View>

            {/* <ScrollView style={estilosPrincipal.scrollView}> */}
                {/* {accionesCompradas.map((accion) => ( */}
                    {/* <TouchableOpacity key={accion.simbolo} onPress={() => handleAccionPress(accion.simbolo)}> */}
                        
                            {/* aqui iria las acciones que a comprado */}

                    {/* </TouchableOpacity> */}
                {/* ))} */}
            {/* </ScrollView> */}

            <NavBar navigation={navigation} />
        </View>
    );
};

export default Ventas;
