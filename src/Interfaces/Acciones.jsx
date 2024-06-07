import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { estilosPrincipal } from './Estilos.jsx';
import NavBar from '../components/Navbar.jsx';

const Ventas = ({ navigation, route }) => {
    const [accionesCompradas, setAccionesCompradas] = useState([]);
    const [empresaNombres, setEmpresaNombres] = useState({});
    const [loading, setLoading] = useState(true);

    const datosU = route.params.usuario;
    const usuario = datosU;

    useEffect(() => {
        const fetchAccionesCompradas = async () => {
            try {
                const response = await fetch(`http://localhost:3001/UsuarioAccionUser/usuario/${usuario.id}`);
                const data = await response.json();
                setAccionesCompradas(data);
                await fetchNombresEmpresas(data);
            } catch (error) {
                console.error('Error fetching acciones compradas:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchNombresEmpresas = async (acciones) => {
            const nombres = {};
            for (const accion of acciones) {
                try {
                    const response = await fetch(`https://api-acciones.onrender.com/api/acciones/${accion.simbolo_empresa}`);
                    const data = await response.json();
                    nombres[accion.simbolo_empresa] = data.nombre;
                } catch (error) {
                    console.error('Error conseguir empresa:', error);
                }
            }
            setEmpresaNombres(nombres);
        };

        fetchAccionesCompradas();
    }, []);

    const handleAccionPress = (simbolo) => {
        navigation.navigate('Ventas', { simbolo, usuario });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const fecha = (fecha) => {
        const now = new Date(fecha);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    return (
        <View style={estilosPrincipal.container}>
            <View style={estilosPrincipal.head}>
                <Text style={estilosPrincipal.title}>Mis Acciones</Text>
            </View>

            <ScrollView style={estilosPrincipal.scrollView}>
                {accionesCompradas.map((accion) => (
                    <TouchableOpacity key={accion.simbolo_empresa} onPress={() => handleAccionPress(accion.simbolo_empresa)}>
                        <View style={estilosPrincipal.accionContainer}>
                            <Text style={estilosPrincipal.accionNombre}>
                                {empresaNombres[accion.simbolo_empresa] || 'Cargando nombre...'}
                            </Text>
                            <Text style={estilosPrincipal.accionPrecio}>Cantidad: {accion.cantidad}</Text>
                            <Text style={estilosPrincipal.accionCambio}>Precio compra: {accion.precio_compra}</Text>
                            <Text style={estilosPrincipal.accionCambio}>Fecha: {fecha(accion.fecha_compra)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <NavBar navigation={navigation} usuario={usuario} />
        </View>
    );
};

export default Ventas;
