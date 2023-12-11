import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import uuidV4 from 'uuid/v4'
import { colors } from '../theme'

class AddCity extends React.Component {
  state = {
    city: '',
    state: ''
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  submit = () => {
    if (this.state.city === '' || this.state.state === '') alert('please complete form')
    const city = {
      city: this.state.city,
      state: this.state.state,
      id: uuidV4(),
      stores: []
    }
    this.props.route.params.addCity(city)
    this.setState({
      city: '',
      state: ''
    }, () => {
      this.props.navigation.navigate('Cities')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Cities</Text>
        <TextInput
          placeholder='City name'
          onChangeText={val => this.onChangeText('city', val)}
          style={styles.input}
          value={this.state.city}
        />
        <TextInput
          placeholder='State name'
          onChangeText={val => this.onChangeText('state', val)}
          style={styles.input}
          value={this.state.state}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add City</Text>
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

export default AddCity