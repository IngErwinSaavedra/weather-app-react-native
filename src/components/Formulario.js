import React, { useState, useRef } from "react";
import {
    Animated, Text, TextInput, View, StyleSheet, TouchableWithoutFeedback,
    Alert
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';


const Formulario = ({ busqueda, guardarBusqueda }) => {


    const { pais, ciudad } = busqueda;

    const animacionboton = useRef(new Animated.Value(0)).current;

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta();
            return;
        }
        guardarBusqueda(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y país para la búsqueda',
            [{ text: 'Entendido' }]
        );
    }

    const animacionEntrada = () => {
        Animated.timing(animacionboton, {
            toValue: .9,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }

    const animacionSalida = () => {
        Animated.timing(animacionboton, {
            toValue: 1,
            friction: 1,
            duration: 2000,
            tension: 100,
            useNativeDriver: true,
        }).start();
    }

    const estiloAnimacion = () => {
        transform: [{ scale: animacionboton }];
    }

    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad => guardarBusqueda({ ...busqueda, ciudad })}
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <RNPickerSelect
                        selectedValue={pais}
                        style={pickerSelectStyles}
                        onValueChange={pais => guardarBusqueda({ ...busqueda, pais })}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: '-- Seleccione un pais --', value: '' },
                            { label: 'Estados Unidos', value: 'US' },
                            { label: 'Mexico', value: 'MX' },
                            { label: 'Chile', value: 'CL' },
                            { label: 'Colombia', value: 'CO' },
                            { label: 'Costa Rica', value: 'CR' },
                            { label: 'España', value: 'ES' },
                            { label: 'Argentina', value: 'AR' },
                            { label: 'Peru', value: 'PE' },
                        ]}
                    />
                </View>
                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}
                >
                    <Animated.View
                        style={[styles.btnBuscar, estiloAnimacion]}
                    >
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF', 
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
});

const pickerSelectStyles = StyleSheet.create({
    height: 120,
    backgroundColor: '#FFF'
})

export default Formulario;