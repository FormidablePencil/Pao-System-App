import React from 'react';
import Index from './src/Index';
import { BackHandler } from 'react-native';


   //~ code this first (oh how I love TypeScript) then work with the phone. Try to code a result without testing it first
  //1. controlled inputText by having one state listen to the the inputtext and when user taps away fire a function to save that item into state and execute a POST action to update/create item. 
  //2. we'll need a useHook to handle the testing of weather we make a update or create request. That's testing if redux state contains the document... first save to redux then fire actions
  //3. the merging of states to render into paoTable is already done. 
  //4. if user offline then suspend/disable all editing actions. We'll know if user is offline by some React-Native api: check if internet connection
  //5. that's all folks
  //6. replace FlatList for a higher proforment list. There's a bug that keeps popping up ever so often, replacing the list could be a solution or we'll have to create a new expo instance and move the code there and see what's up

  //% onPress => will inharit a controlled state in which will copy into itself the specific value from the array.
  //% ~ typing will change that state and the second the user onBlurs/offFocus save item to redux 
  //% now only save to db if the user switches screens or the user click "off editMode" icon. => that will execute an action to save whole list (useSelector) to backend
  //~ there you have it folks!
  //* from here the paoTable will be done and only need a recycleableFlatList
  //% Now we can move onto Flashcards and implement the diffrent study modes (including study stared), auto changing cards and update item functionality.
  //% implement stared section... giving documents 'stared' property

const App = () => {

  return (
    <Index />
  )
}

export default App