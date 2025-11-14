import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, FlatList } from 'react-native';

export default function App() {
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [rua, setRua] = useState('');
  const [resultado, setResultado] = useState([]);

  const buscarCep = async () => {
    if (!estado || !municipio || !rua) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const url = `https://viacep.com.br/ws/${estado}/${municipio}/${rua}/json/`;
      const res = await fetch(url);
      const data = await res.json();

      if (data && !data.erro) {
        setResultado(data);
      } else {
        Alert.alert('Aviso', 'CEP não encontrado.');
        setResultado([]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter os dados.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encontre seu CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o Estado (UF)"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o Município"
        value={municipio}
        onChangeText={setMunicipio}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o Nome da Rua"
        value={rua}
        onChangeText={setRua}
      />

      <Button title="Buscar CEP" onPress={buscarCep} />

      {resultado.length > 0 && (
        <FlatList
          data={resultado}
          keyExtractor={(item) => item.cep}
          renderItem={({ item }) => (
            <View style={styles.resultado}>
              <Text>CEP: {item.cep}</Text>
              <Text>Logradouro: {item.logradouro}</Text>
              <Text>Bairro: {item.bairro}</Text>
              <Text>Cidade: {item.localidade}</Text>
              <Text>Estado: {item.uf}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  resultado: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
});
