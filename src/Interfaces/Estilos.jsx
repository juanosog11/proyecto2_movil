import {Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');


export const estilos_estandar = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain', // Ajusta el tamaño de la imagen según su contenedor
        borderRadius: 300,
    },
    sliderContainer: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    sliderContainer:{
        width: '100%',
        height: 200,
        marginTop: 10,
    },
    slide: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'cover',
    },
    slideText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    })

export const principal = StyleSheet.create({
    form: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    title2: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        marginLeft: 0,
        marginRight: 10,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        marginBottom: 7,
    },
    button: {
        backgroundColor: '#fff',
        color: 'black',
        borderRadius: 3,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
    },
    buttonRedes: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: "center",
    },
})


export const estilosPerfil = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    form: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    userData: {
        marginBottom: 10,
    },
    userDataLabel: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'blue', // Color de fondo del botón
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff', // Color del texto del botón
        fontWeight: 'bold',
    },
});

export const EstiloRegistro = StyleSheet.create({
  form: {
    marginTop: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  input: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    marginBottom: 7,
  },
  buttonContainer: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
});


export const navbar = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabBarItem: {
        alignItems: 'center',
    },
    tabBarItemText: {
        fontSize: 12,
        color: '#333',
    },
});
    export const EstiloModificar = StyleSheet.create({

    });
