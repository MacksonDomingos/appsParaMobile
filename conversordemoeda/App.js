
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [valorBTC, setValorBTC] = useState('');
  const [resultado, setResultado] = useState(null);

  const converterParaBRL = async () => {
    if (!valorBTC) return;

    const valorFormatado = valorBTC.replace(',', '.');
    try {
      const res = await fetch('https://economia.awesomeapi.com.br/json/last/BTC-BRL');
      const data = await res.json();
      const cotacao = parseFloat(data.BTCBRL.bid);
      const convertido = parseFloat(valorFormatado) * cotacao;
      setResultado(convertido.toFixed(2));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a cotação.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor BTC → BRL</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor em BTC"
        keyboardType="numeric"
        value={valorBTC}
        onChangeText={setValorBTC}
      />
      <Button title="Converter" onPress={converterParaBRL} />
      {resultado && (
        <Text style={styles.resultado}>
          = {resultado} BRL
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 18,
  },
  resultado: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
});