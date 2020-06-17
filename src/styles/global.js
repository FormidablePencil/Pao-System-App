import { StyleSheet } from 'react-native';
import styled from 'styled-components'
import { Text } from 'react-native-paper'

export const globalStyles = StyleSheet.create({
  rockSaltFont: {
    fontFamily: "rock-salt",
  },
  settingsIconImg: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  flashcard: {
    height: '80%', borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    elevation: 2,
  },
  centerEverything: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100%',
    // width: '100%',

  },
  flashcardModal: {
    height: '50%',
  },
  tiger: {
    transform: [{ rotate: '-90deg' }],
    zIndex: 300
  },
  card: {

  },
  cardFlip: {
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 600,
    width: 300,
    alignSelf: 'center'
  },
  flashView: {
  },
  whiteText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'MontserratReg',
  }
})

{/* < View className = "flex justify-center items-center bg-white w-full" style = {{ ...globalStyles.flashcard }}> */ }


// style={{rotate: '90deg'}}

export const StyledText = styled.Text`
  /* font-family: rock-salt; */
  text-align: center;
  font-size: 15;
`
export const WhiteText = styled(Text)`
  color: white;
`