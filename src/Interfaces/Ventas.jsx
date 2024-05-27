import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { estilosVenta } from './Estilos.jsx';
import NavBar from '../components/Navbar.jsx';

const Venta = ({ route, navigation }) => {
    const { simbolo } = route.params;
    const [accion, setAccion] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [accionesUsuario, setAccionesUsuario] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccion = async () => {
            try {
                const response = await fetch(`https://api-acciones.onrender.com/api/acciones/${simbolo}`);
                const data = await response.json();
                setAccion(data);
            } catch (error) {
                console.error('Error fetching accion:', error);
            } finally {
                setLoading(false);
            }
        };

        // const fetchAccionesUsuario = async () => {
        //     try {
        //         const response = await fetch(`https://api-acciones.onrender.com/api/acciones_usuario/${simbolo}`); // Reemplaza con la URL adecuada para obtener las acciones del usuario
        //         const data = await response.json();
        //         setAccionesUsuario(data.cantidad);
        //     } catch (error) {
        //         console.error('Error fetching acciones usuario:', error);
        //     }
        // };

        // fetchAccion();
        // fetchAccionesUsuario();
    }, [simbolo]);

    // const handleVenta = async () => {
    //     if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
    //         Alert.alert('Error', 'Por favor, ingresa una cantidad válida.');
    //         return;
    //     }

    //     if (cantidad > accionesUsuario) {
    //         Alert.alert('Error', 'No tienes suficientes acciones para vender.');
    //         return;
    //     }

    //     const precioTotal = cantidad * accion.precio;

    //     try {
    //         // const response = await fetch('https://api-acciones.onrender.com/api/vender', {
    //         //     method: 'POST',
    //         //     headers: {
    //         //         'Content-Type': 'application/json',
    //         //     },
    //         //     body: JSON.stringify({
    //         //         simbolo,
    //         //         cantidad,
    //         //         precioTotal,
    //         //     }),
    //         // });

    //         // if (response.ok) {
    //         //     Alert.alert('Venta realizada', `Has vendido ${cantidad} acciones de ${accion.nombre} por ${precioTotal} USD.`);
    //         //     navigation.goBack();
    //         // } else {
    //         //     Alert.alert('Error', 'Hubo un problema al realizar la venta.');
    //         // }

    //         console.log("accion vendida ")
    //     } catch (error) {
    //         console.error('Error realizando la venta:', error);
    //         Alert.alert('Error', 'Hubo un problema al realizar la venta.');
    //     }
    // };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={estilosVenta.container}>
            <Text style={estilosVenta.titulo}>Venta de Acciones</Text>
            {accion && (
                <>
                    <Text style={estilosVenta.nombreAccion}>{accion.nombre}</Text>
                    <Text style={estilosVenta.precioAccion}>Precio por acción: {accion.precio} USD</Text>
                    {/* <Text style={estilosVenta.cantidadAcciones}>Acciones disponibles: {accionesUsuario}</Text> */}
                    <TextInput
                        style={estilosVenta.input}
                        placeholder="Cantidad"
                        keyboardType="numeric"
                        value={cantidad}
                        onChangeText={text => setCantidad(text)}
                    />
                    <Text style={estilosVenta.precioTotal}>
                        Precio total: {cantidad ? (cantidad * accion.precio).toFixed(2) : '0.00'} USD
                    </Text>
                    <Button title="Vender" onPress={handleVenta} />
                </>
            )}
            <NavBar navigation={navigation} />
        </View>
    );
};


export default Venta;

