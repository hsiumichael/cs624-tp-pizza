import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import uuidV4 from 'uuid/v4'
import { colors } from '../theme'

class AddPizza extends React.Component {
    state = {
        name: '',
        size: '',
        cheese: '',
        toppings: ''
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }
    submit = () => {
        if (this.state.name === '' || this.state.size === '' || this.state.cheese === '' || this.state.toppings === '') alert('please complete form')
        const pizza = {
            name: this.state.name,
            size: this.state.size,
            cheese: this.state.cheese,
            toppings: this.state.toppings,
            id: uuidV4(),
            prices: []
        }
        this.props.route.params.addPizza(pizza)
        this.setState({
            name: '',
            size: '',
            cheese: '',
            toppings: ''
        }, () => {
            this.props.navigation.navigate('Pizzas')
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Pizzas</Text>
                <TextInput
                    placeholder='Pizza name'
                    onChangeText={val => this.onChangeText('name', val)}
                    style={styles.input}
                    value={this.state.name}
                />
                <TextInput
                    placeholder='Size (small, medium, or large)'
                    onChangeText={val => {
                        val = val.charAt(0).toUpperCase() + val.slice(1); 
                        this.onChangeText('size', val)}}
                    style={styles.input}
                    value={this.state.size}
                />
                <TextInput
                    placeholder='Cheese (normal or extra)'
                    onChangeText={val => {
                        val = val.charAt(0).toUpperCase() + val.slice(1);
                        this.onChangeText('cheese', val)}}
                    style={styles.input}
                    value={this.state.cheese}
                />
                <TextInput
                    placeholder='Toppings'
                    onChangeText={val => {
                        val = val.charAt(0).toUpperCase() + val.slice(1);
                        this.onChangeText('toppings', val)}}
                    style={styles.input}
                    value={this.state.toppings}
                />
                <TouchableOpacity onPress={this.submit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Add Pizza</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      height: 50,
      backgroundColor: colors.red,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    buttonText: {
      color: 'white',
      fontSize: 18
    },
    heading: {
      color: 'white',
      fontSize: 40,
      marginBottom: 10,
      alignSelf: 'center'
    },
    container: {
      backgroundColor: colors.green,
      flex: 1,
      justifyContent: 'center'
    },
    input: {
      margin: 10,
      backgroundColor: 'white',
      paddingHorizontal: 8,
      height: 50
    }
  })

  export default AddPizza