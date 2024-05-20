import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, Dimensions } from 'react-native';
import { estilos_estandar, compra } from "./Estilos";
import NavBar from '../components/Navbar.jsx';
import LineChart from '../components/LinesChart.js';



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

    const labelsH = DatosH.map(dato => dato.fecha);
    const dataH = DatosH.map(dato => dato.precio);


    return (
        <View style={estilos_estandar.container}>
            <View style={estilos_estandar.head}>
                <Text style={estilos_estandar.title}>smartInvest</Text>
                <Image source={require('../images/logo.jpeg')} style={estilos_estandar.logo} />
            </View>

            

            <ScrollView style={compra.scrollView}>
                <View style={compra.content}>
                    <Text style={compra.title2}>Información de la Acción: {simbolo}</Text>
                    {accion && (
                        <View>
                            <Text style={compra.companyText}>Nombre: {accion.nombre}</Text>
                            <Text style={compra.priceText}>Precio: {accion.precio}</Text>
                        </View>
                    )}

                    {/* <Text style={estilos_estandar.title2}>Datos Históricos:</Text>
                    {DatosH && DatosH.map((dato, index) => (
                        <View key={index}>
                            <Text>Fecha: {dato.fecha}</Text>
                            <Text>Precio: {dato.precio}</Text>
                        </View>
                    ))} */}
                </View>

                <View style={compra.chartContainer}>
                    <Text>Acciones</Text>
                    <LineChart labels={labelsH} data={dataH} />
                </View>

            </ScrollView>

            <NavBar navigation={navigation} />
        </View>
    );
}
