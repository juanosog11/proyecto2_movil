import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { estilosVenta } from './Estilos.jsx';
import NavBar from '../components/Navbar.jsx';

export default function Venta({ navigation, route }) {
    const { simbolo } = route.params;
    const [usuario, setUsuario] = useState(route.params.usuario);
    const [accion, setAccion] = useState({});
    const [cantidad, setCantidad] = useState('');
    const [accionesUsuario, setAccionesUsuario] = useState([]);
    const [loading, setLoading] = useState(true);


    // console.log('Venta accion:', JSON.stringify(usuario));

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

        const AccionUsuario = async () => {
            try {
                const BuscarAcc = await fetch(`http://localhost:3001/UsuarioAccionUser/usuario/${usuario.id}/${simbolo}`);
                const data = await BuscarAcc.json();
                setAccionesUsuario(data);
                console.log('acciones: ', data); // Asegúrate de usar el nombre correcto de la variable aquí
            } catch (error) {
                console.log('Error: ', error);
            }
        };

        fetchAccion();
        AccionUsuario();
    }, [simbolo]);

    const handleVenta = async () => {
        if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
            Alert.alert('Error', 'Por favor, ingresa una cantidad válida.');
            return;
        }

        if (cantidad > accionesUsuario.cantidad) {
            Alert.alert('Error', 'No tienes suficientes acciones para vender.');
            return;
        }

        const precioTotal = (cantidad * accion.precio).toFixed(2);

        const updateSaldoUsuario = async (total) => {
            try {
                // console.log(total)
                const response = await fetch(`http://localhost:3001/Usuario/${usuario.id}`);
                const usuarioData = await response.json();
                const nuevoSaldo = parseFloat(usuarioData.saldo) + parseFloat(total);
                // console.log(nuevoSaldo);

                const updateResponse = await fetch(`http://localhost:3001/Usuario/${usuario.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ saldo: nuevoSaldo })
                });

                
                if (updateResponse.ok) {
                    console.log('Saldo actualizado exitosamente.');
                    setUsuario(updateResponse)
                } else {
                    console.log('Error al actualizar el saldo.');
                    
                }
            } catch (error) {
                console.log('Error al actualizar el saldo del usuario:', error);
            }
        };

        const cantIgual = async (total) => {
            try {
                const response = await fetch(`http://localhost:3001/UsuarioAccion/${accionesUsuario.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    console.log('Acciones vendidas exitosamente.');
                    await updateSaldoUsuario(total);
                    console.log(usuario)
                    
                    navigation.navigate('Principal', { usuario });
                } else {
                    console.log('Error al vender acciones.');
                }
            } catch (error) {
                console.log('Error al vender todas las acciones:', error);
            }
        };

        try {
            if (cantidad == accionesUsuario.cantidad) {
                await cantIgual(precioTotal);
            } else {
                const nuevaCantidad = accionesUsuario.cantidad - cantidad;
                const response = await fetch(`http://localhost:3001/UsuarioAccion/${accionesUsuario.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cantidad: nuevaCantidad
                    })
                });

                if (response.ok) {
                    console.log('Cantidad de acciones actualizada exitosamente.');
                    await updateSaldoUsuario(precioTotal);
                    console.log(usuario)
                    navigation.navigate('Principal', { usuario });
                } else {
                    console.log('Error al actualizar la cantidad de acciones.');
                }
            }
        } catch (error) {
            console.error('Error realizando la venta:', error);
            Alert.alert('Error', 'Hubo un problema al realizar la venta.');
        }
    };


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
                    <Text style={estilosVenta.cantidadAcciones}>Acciones disponibles: {accionesUsuario.cantidad}</Text>
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
            <NavBar navigation={navigation} usuario={usuario} />
        </View>
    );
};
