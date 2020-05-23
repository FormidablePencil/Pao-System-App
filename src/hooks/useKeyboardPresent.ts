import { Keyboard } from "react-native"
import { useEffect, useState } from "react"

const useKeyboardPresent = () => {
  const [keyboardPresent, setKeyboardPresent] = useState(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardPresent(true))
    Keyboard.addListener('keyboardDidHide', () => setKeyboardPresent(false))

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => { })
      Keyboard.removeListener('keyboardDidHide', () => { })
    }
  })
  return keyboardPresent
}

export default useKeyboardPresent