import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { navbar } from '../Interfaces/Estilos';

export default function NavBar({ navigation }) {
    return (
        <View style={navbar.tabBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Principal')} style={navbar.tabBarItem}>
                <Icon name='home' size={24} color='#333' />
                <Text style={navbar.tabBarItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={navbar.tabBarItem}>
                <Icon name='person' size={24} color='#333' />
                <Text style={navbar.tabBarItemText}>Profile</Text>
            </TouchableOpacity>
            {/* Agrega más botones aquí según tus necesidades */}
        </View>
    );
}
