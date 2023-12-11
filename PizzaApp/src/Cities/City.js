import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity} from 'react-native'

import CenterMessage from '../components/CenterMessage'
import { colors } from '../theme'

class City extends React.Component {
  static navigationOptions = (props) => {
    const { city } = props.route.params
    return {
      title: city.city,
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400'
      }
    }
  }
  state = {
    name: '',
    address: ''
  }
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  addStore = () => {
    if (this.state.name === '' || this.state.address === '') return
    const { city } = this.props.route.params
    const store = {
      name: this.state.name,
      address: this.state.address
    }
    this.props.route.params.addStore(store, city)
    this.setState({ name: '', address: '' })
  }
  render() {
    const { city } = this.props.route.params
    console.log('props: ', this.props)
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[!city.stores.length && { flex: 1 }]}>
          <View style={[styles.storesContainer, !city.stores.length && { flex: 1, justifyContent: 'center' }]}>
            {
              !city.stores.length && <CenterMessage message='No restaurants for this city!' />
            }
            {
              city.stores.map((store, index) => (
                <View key={index} style={styles.storeContainer}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeAddress}>{store.address}</Text>
                </View>
              ))
            }
          </View>
        </ScrollView>
        <TextInput
          onChangeText={val => this.onChangeText('name', val)}
          placeholder='Restaurant name'
          value={this.state.name}
          style={styles.input}
          placeholderTextColor='white'
        />
        <TextInput
          onChangeText={val => this.onChangeText('address', val)}
          placeholder='Address'
          value={this.state.address}
          style={[styles.input, styles.input2]}
          placeholderTextColor='white'
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.addStore}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add Restaurant</Text>
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
  storesContainer: {
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
  storeContainer: {
    padding: 10,
    borderBottomColor: colors.green,
    borderBottomWidth: 2
  },
  storeName: {
    fontSize: 20
  },
  storeAddress: {
    color: 'rgba(0, 0, 0, .5)'
  }
})

export default City