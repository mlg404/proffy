import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8257e5',
    padding: 40
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    lineHeight: 32,
    fontSize: 24,
    maxWidth: 160,
    marginVertical: 40
  }
});

export default styles;