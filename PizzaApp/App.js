import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import Cities from './src/Cities/Cities';
import City from './src/Cities/City';
import AddCity from './src/AddCities/AddCity';
import Pizzas from './src/Pizzas/Pizzas';
import Pizza from './src/Pizzas/Pizza';
import AddPizza from './src/AddPizzas/AddPizza';

import { colors } from './src/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CitiesStackScreen ({navigation, route}){
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.green
      },
      headerTintColor: '#fff'
    }}>
    <Stack.Screen name="Cities" component={Cities} initialParams={{
      cities: route.params.cities,
      addCity: route.params.addCity,
      addStore: route.params.addStore}}/>
    <Stack.Screen name="City" component={City} initialParams={{
      cities: route.params.cities,
      addCity: route.params.addCity,
      addStore: route.params.addStore}}/>
    </Stack.Navigator>
  );
}

function PizzasStackScreen ({navigation, route}){
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.green
      },
      headerTintColor: '#fff'
    }}>
    <Stack.Screen name="Pizzas" component={Pizzas} initialParams={{
      pizzas: route.params.pizzas,
      addPizza: route.params.addPizza,
      addPrice: route.params.addPrice}}/>
    <Stack.Screen name="Pizza" component={Pizza} initialParams={{
      pizzas: route.params.pizzas,
      addPizza: route.params.addPizza,
      addPrice: route.params.addPrice}}/>
    </Stack.Navigator>
  );
}

export default class App extends Component {
  state = {
    cities: [],
    pizzas: []
  }
  addCity = (city) => {
    const cities = this.state.cities
    cities.push(city)
    this.setState({ 
      cities: cities
    })
  }
  addStore = (store, city) => {
    const index = this.state.cities.findIndex(item => {
      return item.id === city.id
    })
    const chosenCity = this.state.cities[index]
    chosenCity.stores.push(store)
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ]
    this.setState({
      cities: cities
    })
  }
  addPizza = (pizza) => {
    const pizzas = this.state.pizzas
    pizzas.push(pizza)
    this.setState({
      pizzas: pizzas
    })
  }
  addPrice = (price, pizza) => {
    const index = this.state.pizzas.findIndex(item => {
      return item.id === pizza.id
    })
    const chosenPizza = this.state.pizzas[index]
    chosenPizza.prices.push(price)
    const pizzas = [
      ...this.state.pizzas.slice(0, index),
      chosenPizza,
      ...this.state.pizzas.slice(index + 1)
    ]
    this.setState({
      pizzas: pizzas
    })
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Pizza List"    initialParams={{pizzas: this.state.pizzas, addPizza: this.addPizza, addPrice: this.addPrice}} component={PizzasStackScreen} />
          <Tab.Screen name="Add Pizza" initialParams={{pizzas: this.state.pizzas, addPizza: this.addPizza, addPrice: this.addPrice}} component={AddPizza} />
          <Tab.Screen name="City List"    initialParams={{cities: this.state.cities, addCity: this.addCity, addStore: this.addStore}} component={CitiesStackScreen} />
          <Tab.Screen name="Add City"  initialParams={{cities: this.state.cities, addCity: this.addCity, addStore: this.addStore}} component={AddCity} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}