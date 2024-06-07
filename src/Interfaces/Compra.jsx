import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, Text, TextInput, View } from 'react-native';
import LineChart from '../components/LinesChart.jsx';
import NavBar from '../components/Navbar.jsx';
import { compra, estilos_estandar } from "./Estilos.jsx";

export default function Compra({ navigation, route }) {

    const { simbolo } = route.params;
    const { usuario } = route.params;

    const [accion, setAccion] = useState([]);
    const [DatosH, setDatosH] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchAcciones = async () => {
            try {
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
    }, []); // Añadir un array vacío aquí para que useEffect se ejecute solo una vez

    useEffect(() => {
        if (accion.precio) {
            setTotal(cantidad * accion.precio);
        }
    }, [cantidad, accion]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }


    const handleCompra = () => {
        alert(`Has comprado ${cantidad} acciones de ${simbolo} por un total de ${total}`);
    };

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
                </View>

                <View style={compra.chartContainer}>
                    <Text style={compra.title2}>Histórico de Precios</Text>
                    <LineChart labels={labelsH} data={dataH} />
                </View>

                <View style={compra.inputContainer}>
                    <TextInput
                        style={compra.input}
                        keyboardType='numeric'
                        placeholder='Cantidad'
                        value={cantidad.toString()}
                        onChangeText={(text) => setCantidad(Number(text))}
                    />
                    <Text style={compra.priceText}>Precio por acción: {accion.precio}</Text>
                    <Text style={compra.totalText}>Total: {total}</Text>
                    <Button title="Comprar" onPress={handleCompra} />
                </View>
            </ScrollView>

            <NavBar navigation={navigation} usuario={usuario} />
        </View>
    );
}
