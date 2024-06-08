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
    const [error, setError] = useState('');

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

    const no_existe = async () => {
        alert(`Has comprado ${cantidad} acciones de ${simbolo} por un total de ${total}`);
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0, así que sumamos 1 y rellenamos con ceros a la izquierda
            const day = String(now.getDate()).padStart(2, '0'); // Rellenamos con ceros a la izquierda

            const formattedDate = `${year}-${month}-${day}`;

            const usuariAccion = {
                usuario_id: usuario.id,
                simbolo_empresa: simbolo,
                cantidad: cantidad,
                precio_compra: accion.precio,
                fecha_compra: formattedDate,
            };

            console.log(usuariAccion);

            const response = await fetch('http://localhost:3001/UsuarioAccion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                },
                body: JSON.stringify(usuariAccion)
            });

            if (!response.ok) {
                throw new Error('Error al insertar los datos');
            }

            const result = await response.json();
            console.log('Datos insertados:', result);
            navigation.navigate('Principal', { usuario })

        } catch (error) {
            console.error('Error en la compra:', error);
        }
    }


    const handleCompra = async () => {
        if (cantidad !== 0) {
            setError(''); // Limpiar el mensaje de error si hay una cantidad válida

            try {
                // Hacer la solicitud para verificar si la empresa existe por su símbolo
                const response = await fetch(`http://localhost:3001/UsuarioAccionUser/simbolo/${simbolo}`);
                if (!response.ok) {
                    throw new Error('Error al buscar la empresa');
                }

                const data = await response.json();

                if (data.length > 0) {
                    // Si la empresa existe, actualizamos la cantidad de acciones
                    const empresa = data[0];
                    const nuevaCantidad = empresa.cantidad + cantidad;

                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0, así que sumamos 1 y rellenamos con ceros a la izquierda
                    const day = String(now.getDate()).padStart(2, '0'); // Rellenamos con ceros a la izquierda

                    const formattedDate = `${year}-${month}-${day}`;


                    const updateResponse = await fetch(`http://localhost:3001/UsuarioAccion/${empresa.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            usuario_id: empresa.usuario_id,
                            simbolo_empresa: empresa.simbolo_empresa,
                            cantidad: nuevaCantidad,
                            precio_compra: empresa.precio_compra,
                            fecha_compra: formattedDate
                        })
                    });

                    if (!updateResponse.ok) {
                        throw new Error('Error al actualizar la cantidad de acciones');
                    }

                    const updatedEmpresa = await updateResponse.json();
                    console.log('Cantidad de acciones actualizada exitosamente:', updatedEmpresa);
                    navigation.navigate('Principal', { usuario })
                } else {
                    // Si la empresa no existe, llama a la función no_existe()
                    no_existe();
                }
            } catch (error) {
                console.log("error: ", error);
                setError('Ocurrió un error al realizar la compra. Inténtalo de nuevo más tarde.');
            }
        } else {
            setError('Por favor, ingrese una cantidad válida'); // Mostrar el mensaje de error
        }
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
                    {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
                    <Button title="Comprar" onPress={handleCompra} />

                </View>
            </ScrollView>

            <NavBar navigation={navigation} usuario={usuario} />
        </View>
    );
}
