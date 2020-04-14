import React, { useState, useEffect, useContext, createContext } from 'react'
import { View, Text } from 'react-native-tailwind'
import EnterOptions from '../components/ChooseEnteringOption'
import RenderEnterComps from '../components/RenderEnterComps'

//@ what we'll need: 
//@ 1. reusable inputs component
//@ 2. redux actions to hook up to backend endpoints
/////@ 3. reducers with their types created
//~ 3.5 import reusable textinput components through bit
//@ 4. Component for enterAppOptions, signinForm, signupForm
// % lets get this all hooked up before testing the code out

export const EnterMethodContext = createContext()

const EnterScreen = () => {
  enum comps { enterOptions, signup, signin } //index starts from 0 'enum.signup' should be '1'
  //are these a replacement for objects? With regular obj your have to create obj and then set interface to it. This possibly could be the replacement
  const [compToRender, setCompToRender] = useState(comps.enterOptions)

  //~ creating: login page 

  return (

    <EnterMethodContext.Provider value={{ compToRender, setCompToRender,  comps }}>
      <RenderEnterComps />
    </EnterMethodContext.Provider>
  )
}

export default EnterScreen
