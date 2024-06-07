import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { navbar } from '../Interfaces/Estilos';

export default function NavBar({ navigation, usuario }) {
    // console.log('NavBar usuario:', JSON.stringify(usuario));
    return (
        <View style={navbar.tabBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Principal', { usuario })} style={navbar.tabBarItem}>
                <Icon name='home' size={24} color='#333' />
                <Text style={navbar.tabBarItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Acciones', { usuario })} style={navbar.tabBarItem}>
                <Icon name='wallet' size={24} color='#333' />
                <Text style={navbar.tabBarItemText}>Acciones</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil', { usuario })} style={navbar.tabBarItem}>
                <Icon name='person' size={24} color='#333' />
                <Text style={navbar.tabBarItemText}>Mis Profile</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Ventas', { usuario })} style={navbar.tabBarItem}>
                <Icon name='cart' size={24} color='#333' />
                <Text style={navbar.tabBarItemText}>Ventas</Text>
            </TouchableOpacity> */}
        </View>
    );
}
