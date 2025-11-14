import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';

export default function App() {
  const [temperatura, setTemperatura] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarTemperatura = async () => {
    try {
      setCarregando(true);
      const resposta = await fetch('https://api.thingspeak.com/channels/2956336/fields/1/last.json');
      const dados = await resposta.json();
      setTemperatura(dados.field1);
    } catch (erro) {
      console.error('Erro ao carregar temperatura:', erro);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarTemperatura();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarTemperatura();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.titulo}>Temperatura Atual</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <Text style={styles.valor}>
          {temperatura ? `${temperatura} °C` : 'Erro ao obter temperatura'}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  valor: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E53935',
  },
});
