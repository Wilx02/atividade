import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Stacks
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// --------------------- TELAS ---------------------
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>🏠 Home</Text>
      <Button
        title="Ir para Detalhes com params"
        onPress={() => navigation.navigate("Detalhes", { nome: "Wesley", idade: 21 })}
      />
    </View>
  );
}

function DetalhesScreen({ route }) {
  // Pegando params
  const { nome, idade } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>📌 Detalhes</Text>
      <Text>Nome: {nome}</Text>
      <Text>Idade: {idade}</Text>
    </View>
  );
}

function SobreScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ℹ️ Sobre</Text>
    </View>
  );
}

function ContatoScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>📞 Contato</Text>
    </View>
  ); 
}

function AjudaScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>❓ Ajuda</Text>
    </View>
  );
}

// --------------------- NAVEGAÇÕES ---------------------

// Stack Principal
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
    </Stack.Navigator>
  );
}

// Tabs (inclui Stack e telas adicionais)
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início" component={StackNavigator} />
      <Tab.Screen name="Sobre" component={SobreScreen} />
      <Tab.Screen name="Contato" component={ContatoScreen} />
    </Tab.Navigator>
  );
}

// Drawer (inclui Tabs e Ajuda)
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Principal" component={TabNavigator} />
      <Drawer.Screen name="Ajuda" component={AjudaScreen} />
    </Drawer.Navigator>
  );
}

//app
export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
