import React, { useState } from "react"
import InputSpinner from 'react-native-input-spinner'


const localStorage = 40

const AmountOfCardsAccumulator = () => {
  const [amountOfCards, setAmountOfCards] = useState(localStorage)

  return (
    <InputSpinner
      // inputStyle={{ ...reusableStyles.whiteText }}
      // colorLeft={theme.colors.fabActionColors[1]}
      // colorRight={theme.colors.fabActionColors[1]}
      colorPress='#4880A5'
      buttonPressStyle={{ backgroundColor: '#4880A5' }}
      colorMax={'#4880A5'}
      colorMin={'#4880A5'}
      max={30}
      min={2}
      step={2}
      value={amountOfCards}
      color='orange'
      onChange={(num) => {
        setAmountOfCards(num)
      }}
    >
    </InputSpinner>
  )
}

export default AmountOfCardsAccumulator
