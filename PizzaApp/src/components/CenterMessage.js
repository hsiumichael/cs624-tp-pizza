import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../theme'

const CenterMessage = ({ message }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.message}>{message}</Text>
  </View>
)

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.green
  },
  message: {
    alignSelf: 'center',
    fontSize: 20,
    color: colors.red
  }
})

export default CenterMessage