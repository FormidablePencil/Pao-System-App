import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import AddAndDeleteItemFromReduxBtn from '@bit/formidablepencil.my-react-native-comps.add-and-delete-item-from-redux-btn'

const FavScreen = () => {
  const favList = useSelector((state: any) => state.favList)

  return (
    <SafeAreaView>
      <Text>here</Text>
      <Text>here</Text>
      <Text>here</Text>
      {/* <AddAndDeleteItemFromReduxBtn
        payload={1}
        whatState={favList}
        compareFromCluster={12}
        addType={12}
        deleteType={12}
        child1={12}
        child2={12}
        btnStyle={12}
      /> */}
      {/* <FlatList
        data={favList}
        renderItem={({ item }) => (
          <AddDeleteInReduxCompWithBtn />
          
        )}
        keyExtractor={item => item.id}
        // extraData={selected}
      /> */}
    </SafeAreaView>
  )
}

export default FavScreen


import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

// const AddAndDeleteItemFromReduxBtn = ({ payload, whatState, compareFromCluster, addType, deleteType, child1, child2, btnStyle }) => {
//   const itemExists = useSelector(state => state[whatState].filter(cluster => {
//     if (compareFromCluster) return cluster[compareFromCluster] === payload
//     else return cluster === payload
//   })[0])
//   const dispatch = useDispatch()

//   useEffect(() => {
//   }, [itemExists])
//   const onPressStar = () => {
//     if (!itemExists) dispatch({ type: addType, payload })
//     else dispatch({ type: deleteType, payload })
//   }

//   return (
//     <>
//       <TouchableOpacity onPress={onPressStar} style={btnStyle}>
//         {!itemExists ?
//           <>
//             {child1}
//           </>
//           :
//           <>
//             {child2}
//           </>
//         }
//       </TouchableOpacity>
//     </>
//   )
// }

