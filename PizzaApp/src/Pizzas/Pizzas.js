import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import CenterMessage from '../components/CenterMessage'
import { colors } from '../theme'

export default class Pizzas extends React.Component {
    static navigationOptions = {
        title: 'Pizzas',
        headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: '400'
        }
    }
    navigate = (item) => {
        this.props.navigation.navigate('Pizza', { pizza: item })
    }
    render() {
        const { pizzas } = this.props.route.params;
        return (
            <ScrollView contentContainerStyle={[!pizzas.length && { flex: 1 }]}>
                <View style={[!pizzas.length && { justifyContent: 'center', flex: 1 }]}>
                    {
                        !pizzas.length && <CenterMessage message='No saved pizzas!' />
                    }
                    {
                        pizzas.map((item, index) => (
                            <TouchableWithoutFeedback onPress={() => this.navigate(item)} key={index}>
                                <View style={styles.pizzaContainer}>
                                    <Text style={styles.pizza}>{item.name}</Text>
                                    <Text style={styles.ingredients}>
                                        Size: {item.size} {"\n"}
                                        Cheese: {item.cheese} {"\n"}
                                        Toppings: {item.toppings}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    pizzaContainer: {
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: colors.green
    },
    pizza: {
      fontSize: 20,
    },
    ingredients: {
      color: 'rgba(0, 0, 0, .5)'
    },  
})