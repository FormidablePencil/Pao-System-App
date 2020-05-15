// import React, { useContext } from 'react'
// import { View, Text } from 'react-native-tailwind'
// import { TouchableOpacity } from 'react-native'
// import { StyledText, globalStyles } from '../styles/global'
// // import { TabNavContext } from '../routes/TabNavigator'

// interface SimpleBtnStyles { //for theming pruposes
//   width?: number
//   color?: string
//   text?: string
// }
// // defaulting to values if doesn't exist. 
// const SimpleBtn = ({ width = 64, text = 'btn', color = 'blue' }: SimpleBtnStyles) => {

//   const { modalOpen, setModalOpen } = useContext(TabNavContext)

//   const handleOnclick = () => {
//     setModalOpen(!modalOpen)
//   }

//   return (
//     <TouchableOpacity onPress={() => handleOnclick()} >
//       <View className={`bg-${color}-200 w-${width} rounded-full py-3`}>
//         <StyledText>
//           {text}
//         </StyledText>
//       </View>
//     </TouchableOpacity>
//   )
// }

// interface BtnSliderStyles {
//   btn1Color?: string
//   btn2Color?: string
// }

// export const BtnSlider = ({ btn1Color = 'pink', btn2Color = 'white' }: BtnSliderStyles) => {
//   return (
//     <View className='flex flex-row border border-blue rounded'>
//       <View className={`bg-${btn1Color}-300  flex-1`}>
//         <TouchableOpacity>
//           <StyledText style={{ color: 'white' }}>Study Started</StyledText>
//         </TouchableOpacity>
//       </View>

//       <View className={`bg-${btn2Color}-300 flex-1`}>
//         <TouchableOpacity>
//           <StyledText>Study All</StyledText>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// export default SimpleBtn
