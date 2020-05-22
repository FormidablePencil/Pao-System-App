import React, { useState, useEffect, useContext } from 'react'
import TableHeader from '../components/TableHeader'
import RenderPaoItems from '../components/RenderPaoItems'
import { useSelector } from 'react-redux'
import FabActionBtn from '../components/FabActionBtn'
import { enumFabAction } from '../constants/fabConstants'
import OptionsModal from '../components/OptionsModal'
import { tabScreens } from '../constants/constants'
import { Keyboard } from 'react-native'
import { TabNavContext } from '../routes/StackNavigator'

//~ everything has to work before CRUD with pao lists

export const PaotableScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state: any) => state.auth)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModeTrue, setEditModeTrue] = useState(false)
  const [keyboardPresent, setKeyboardPresent] = useState(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardPresent(true))
    Keyboard.addListener('keyboardDidHide', () => setKeyboardPresent(false))

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => { })
      Keyboard.removeListener('keyboardDidHide', () => { })
    }
  })
  return (
    <>
      {/* <OptionsModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        currentScreen={tabScreens.Paotable}
      /> */}
      {!keyboardPresent &&
        <TableHeader />
      }
      <RenderPaoItems
        editModeTrue={editModeTrue}
      />
      <FabActionBtn
        editModeTrue={editModeTrue}
        setEditModeTrue={setEditModeTrue}
        setModalOpen={setModalOpen}
        whatFabProps={enumFabAction.paoTableFabActions}
      />
    </>
  )
}

export default PaotableScreen



// {/* <Button onPress={() => dispatch(fetchPao({ accessToken }))}>fetchPao</Button>
//   <Button onPress={() => dispatch(putPaoList({ list: sets, accessToken }))}>putPaoList (upload a whole pao list)</Button>
//   <Button>Input: push new doc</Button>
//   <Button>Input: updatePaoDocument</Button>
// <Button>deletePaoDoc</Button> */}
/*
{ number: 0, person: 'James Bond', action: 'running', object: 'flamingos', },
{ number: 1, person: 'Triplets', action: 'drinking', object: 'milk', },
{ number: 2, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
{ number: 3, person: 'Simem', action: 'licking', object: 'popsicles', },
{ number: 4, person: 'James Bond', action: 'running', object: 'flamingos', },
{ number: 5, person: 'Triplets', action: 'drinking', object: 'milk', },
{ number: 6, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
{ number: 7, person: 'Simem', action: 'licking', object: 'popsicles', },
{ number: 8, person: 'James Bond', action: 'running', object: 'flamingos', },
{ number: 9, person: 'Triplets', action: 'drinking', object: 'milk', },
{ number: 10, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
{ number: 11, person: 'Simem', action: 'licking', object: 'popsicles', },
{ number: 12, person: 'James Bond', action: 'running', object: 'flamingos', },
{ number: 13, person: 'Triplets', action: 'drinking', object: 'milk', },
{ number: 14, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
{ number: 15, person: 'Simem', action: 'licking', object: 'popsicles', },
{ number: 16, person: 'James Bond', action: 'running', object: 'flamingos', },
{ number: 17, person: 'Triplets', action: 'drinking', object: 'milk', },
{ number: 18, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
{ number: 19, person: 'Simem', action: 'licking', object: 'popsicles', }, */