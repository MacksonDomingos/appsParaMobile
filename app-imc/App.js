import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');

  function calcularIMC() {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!nome.trim()) {
      setResultado('Por favor, digite seu nome.');
      return;
    }

    if (!pesoNum || !alturaNum) {
      setResultado('Por favor, preencha peso e altura corretamente.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = '';

    if (imc < 18.5) {
      classificacao = `${nome}, você está abaixo do peso.`;
    } else if (imc < 25) {
      classificacao = `${nome}, você está com peso normal.`;
    } else if (imc < 30) {
      classificacao = `${nome}, você está com sobrepeso.`;
    } else if (imc < 35) {
      classificacao = `${nome}, você está com obesidade Grau 1.`;
    } else if (imc < 40) {
      classificacao = `${nome}, você está com obesidade Grau 2.`;
    } else {
      classificacao = `${nome}, você está com obesidade Grau 3.`;
    }

    setResultado(`Seu IMC é: ${imc.toFixed(2)}\n${classificacao}`);
  }

  function limparCampos() {
    setNome('');
    setPeso('');
    setAltura('');
    setResultado('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#999"
        onChangeText={setNome}
        value={nome}
      />

      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu peso"
        placeholderTextColor="#999"
        keyboardType="numeric"
        onChangeText={setPeso}
        value={peso}
      />

      <Text style={styles.label}>Altura (m):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua altura"
        placeholderTextColor="#999"
        keyboardType="numeric"
        onChangeText={setAltura}
        value={altura}
      />

      <View style={styles.botaoContainer}>
        <Button title="Calcular IMC" onPress={calcularIMC} />
        <View style={{ height: 10 }} />
        <Button title="Limpar" color="red" onPress={limparCampos} />
      </View>

      <Text style={styles.resultado}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    margin: 10,
    width: 250,
    textAlign: 'center',
    backgroundColor: 'white',
    fontSize: 16,
  },
  botaoContainer: {
    marginTop: 10,
    width: 250,
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});