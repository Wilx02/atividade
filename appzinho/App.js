import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import HomeTabs from './homeTabs';


const Stack = createNativeStackNavigator<RootStackParamList>();


function DetailsScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhes do item {route.params?.id}</Text>
    </View>
  );
}

// App principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Início' }} />
        <Stack.Screen name="Detalhes" component={DetailsScreen} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos separados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});
