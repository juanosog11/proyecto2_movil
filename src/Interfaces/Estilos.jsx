import {Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const sliderHeight = 100;

export const estilos_estandar = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        resizeMode: 'contain',
        borderRadius: 300,
    },
    sliderContainer: {
        width: width, // Ancho del contenedor al 100% de la pantalla
        height: "100%", // Altura del slider
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
    },
    slide: {
        width: width, // Ancho igual al ancho de la pantalla
        height: sliderHeight, // Altura del slider
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideImage: {
        width: '100%', // Tamaño completo del contenedor
        height: '100%', // Tamaño completo del contenedor
        resizeMode: 'cover',
    },
    slideText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export const principal = StyleSheet.create({
    form: {
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
});

export const estilosPrincipal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    head: {
        alignItems: 'center',
        margin: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    scrollView: {
        flex: 1,
        marginHorizontal: 20,
        // paddingBottom: 80,
        marginBottom:80,
    },
    Container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    accionNombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    accionPrecio: {
        fontSize: 16,
    },
    accionCambio: {
        fontSize: 16,
        color: '#888',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

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
})

export const compra = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    margin: 80,
  },
  // Estilo para el nombre de la empresa
  companyText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold', // Texto en negrita
    color: 'black', // Color azul brillante
    marginBottom: 10, // Margen inferior para separación
  },

  // Estilo para el precio de la acción
  priceText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold', // Texto en negrita
    color: 'black', // Color verde brillante
    marginBottom: 10, // Margen inferior para separación
  },
});

export const EstiloModificar = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 50,
    alignItems: 'center',
  },
  caja: {
    borderColor: 'black',
    paddingTop: 15,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    marginLeft: 0,
    marginRight: 0,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: 290,
    marginBottom: 7,
  },
  comboBox: {
    borderColor: 'black',
    alignItems: 'center',
    borderWidth: 1,
    width: 290,
  },
});
