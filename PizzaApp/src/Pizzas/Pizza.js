import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity} from 'react-native'

import CenterMessage from '../components/CenterMessage'
import { colors } from '../theme'

class Pizza extends React.Component {
    static navigationOptions = (props) => {
        const { pizza } = props.route.params
        return {
            title: pizza.pizza,
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: '400'
            }
        }
    }
    state = {
        store: '',
        price: ''
    }
    onChangeText = (key, value) => {
        this.setState({[key]: value})
    }
    addPrice = () => {
        if (this.state.store === '' || this.state.price === '') return
        const { pizza } = this.props.route.params
        const price = {
            store: this.state.store,
            price: this.state.price
        }
        this.props.route.params.addPrice(price, pizza)
        this.setState({ store: '', price: '' })
    }
    render() {
        const { pizza } = this.props.route.params
        console.log('props: ', this.props)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={[!pizza.prices.length && { flex: 1 }]}>
                    <View style={[styles.pricesContainer, !pizza.prices.length && { flex: 1, justifyContent: 'center' }]}>
                        {
                            !pizza.prices.length && <CenterMessage message='No prices for this pizza!'/>
                        }
                        {
                            pizza.prices.map((price, index) => (
                                <View key={index} style={styles.priceContainer}>
                                    <Text style={styles.storeName}>{price.store}</Text>
                                    <Text style={styles.priceTag}>{price.price}</Text>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                <TextInput
                    onChangeText={val => this.onChangeText('store', val)}
                    placeholder='Restaurant name'
                    value={this.state.store}
                    style={styles.input}
                    placeholderTextColor='white'
                />
                <TextInput
                    onChangeText={val => this.onChangeText('price', val)}
                    placeholder='Price'
                    value={this.state.price}
                    style={[styles.input, styles.input2]}
                    placeholderTextColor='white'
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.addPrice}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Add Price</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    pricesContainer: {
      paddingBottom: 104
    },
    input: {
      height: 50,
      backgroundColor: colors.green,
      color: 'white',
      paddingHorizontal: 8,
      position: 'absolute',
      width: '100%',
      bottom: 104,
      left: 0
    },
    input2: {
      bottom: 52
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    },
    button: {
      height: 50,
      backgroundColor: colors.red,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white'
    },
    priceContainer: {
      padding: 10,
      borderBottomColor: colors.green,
      borderBottomWidth: 2
    },
    storeName: {
      fontSize: 20
    },
    priceTag: {
      color: 'rgba(0, 0, 0, .5)'
    }
  })

  export default Pizza