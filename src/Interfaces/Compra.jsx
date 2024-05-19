import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { estilos_estandar, principal } from "./Estilos";
import NavBar from '../components/Navbar.jsx';

export default function Compra({ route, navigation }) {
    const { simbolo } = route.params;
    const [accion, setAccion] = useState([]);
    const [DatosH, setDatosH] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAcciones = async () => {
            try {
                console.log(simbolo);
                const response = await fetch(`https://api-acciones.onrender.com/api/acciones/${simbolo}`);
                const data = await response.json();
                const response2 = await fetch(`https://api-acciones.onrender.com/api/datos_historicos/${simbolo}`);
                const data2 = await response2.json();
                setDatosH(data2);
                setAccion(data);
                console.log("accion", data);
                console.log("h", data2);
            } catch (error) {
                console.error('Error fetching acciones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAcciones();
    }, [simbolo]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={estilos_estandar.container}>
            <View style={estilos_estandar.head}>
                <Text style={estilos_estandar.title}>smartInvest</Text>
                <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
            </View>

            <NavBar navigation={navigation} />
            {/* Renderiza la información de la acción y los datos históricos aquí */}
            <ScrollView style={estilos_estandar.scrollView}>
                <View style={estilos_estandar.content}>
                    <Text style={estilos_estandar.title2}>Información de la Acción: {simbolo}</Text>
                    {/* Renderiza los datos de la acción */}
                    {accion && (
                        <View>
                            <Text>Nombre: {accion.nombre}</Text>
                            <Text>Precio: {accion.precio}</Text>
                            {/* Otros datos de la acción */}
                        </View>
                    )}
                    <Text style={estilos_estandar.title2}>Datos Históricos:</Text>
                    {DatosH && DatosH.map((dato, index) => (
                        <View key={index}>
                            <Text>Fecha: {dato.fecha}</Text>
                            <Text>Precio: {dato.precio}</Text>
                            {/* Otros datos históricos */}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
