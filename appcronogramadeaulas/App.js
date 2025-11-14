import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [Dia, setDia] = useState('');
  const [aula1, setAula1] = useState('');
  const [aula2, setAula2] = useState('');
  const [aula3, setAula3] = useState('');
  const [resultado, setResultado] = useState('');

  const salvar = async () => {
    try {
      const aulas = JSON.stringify({ aula1, aula2, aula3 });
      await AsyncStorage.setItem(Dia, aulas);
      alert('Item salvo!');
    } catch (error) {
      alert('Erro ao salvar!');
    }
  };

  const ler = async () => {
    try {
      const result = await AsyncStorage.getItem(Dia);
      if (result !== null) {
        const { aula1, aula2, aula3 } = JSON.parse(result);
        setResultado(`Aulas de ${Dia}: ${aula1||nulo}, ${aula2||nulo}, ${aula3||nulo}`);
      } else {
        setResultado('Nada encontrado');
      }
    } catch (error) {
      setResultado('Erro ao ler');
    }
  };

  const remover = async () => {
    try {const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
      const aulas = JSON.stringify({ aula1, aula2, aula3 });
      await AsyncStorage.removeItem(aulas);
      alert('Removido com sucesso');
    } catch (error) {
      alert('Erro ao remover');
    }
  };

  const listarChaves = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      alert('Chaves salvas: ' + keys.join(', '));
    } catch (error) {
      alert('Erro ao listar chaves');
    }
  };

  const lerMultiplos = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      alert(result); 
    } catch (error) {
      alert('Erro ao ler múltiplos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25,fontWeight:'bold' ,marginBottom: 10 ,color: 'white' }}>Cronograma de aulas</Text>
      <TextInput placeholder="Dia" value={Dia} onChangeText={setDia} style={styles.input} />
      <TextInput placeholder="Primeira aula" value={aula1} onChangeText={setAula1} style={styles.input} />
      <TextInput placeholder="Segunda aula" value={aula2} onChangeText={setAula2} style={styles.input} />
      <TextInput placeholder="Terceira aula" value={aula3} onChangeText={setAula3} style={styles.input} />

      <ScrollView>
        <Pressable onPress={salvar} style={styles.botao}>
          <Text style={styles.botaotext}>Salvar</Text>
        </Pressable>
        <Pressable onPress={ler} style={styles.botao}>
          <Text style={styles.botaotext}>Ler</Text>
        </Pressable>
        <Pressable onPress={remover} style={styles.botao}>
          <Text style={styles.botaotext}>Remover</Text>
        </Pressable>
        <Pressable onPress={listarChaves} style={styles.botao}>
          <Text style={styles.botaotext}>Listar dias</Text>
        </Pressable>
        <Pressable onPress={lerMultiplos} style={styles.botao}>
          <Text style={styles.botaotext}>Listar Todos</Text>
        </Pressable>

        <Text style={{ marginTop: 20, fontSize: 16 }}>{resultado}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'lightblue',
  },
  input: {
    borderWidth: 1,
    margin: 5,
    padding: 8,
    backgroundColor: 'white',
  },
  botao: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaotext: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

