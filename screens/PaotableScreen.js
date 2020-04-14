import React, { useState } from 'react'
import { View, Text } from 'react-native-tailwind'
import TableHeader from '../components/TableHeader'
import RenderList from '../components/RenderList'

export const PaotableScreen = () => {
  const [sets, setSets] = useState([
    {number: '00', person: 'James Bond', action: 'running', object: 'flamingos', key: '04'},
    {number: '01', person: 'Triplets', action: 'drinking', object: 'milk', key: '01'},
    {number: '02', person: 'Volk', action: 'howling', object: 'golden toilet paper', key: '23'},
    {number: '03', person: 'Simem', action: 'licking', object: 'popsicles', key: '00'},
    {number: '04', person: 'James Bond', action: 'running', object: 'flamingos', key: '13'},
    {number: '05', person: 'Triplets', action: 'drinking', object: 'milk', key: '98'},
    {number: '06', person: 'Volk', action: 'howling', object: 'golden toilet paper', key: '24'},
    {number: '07', person: 'Simem', action: 'licking', object: 'popsicles', key: '50'},
    {number: '08', person: 'James Bond', action: 'running', object: 'flamingos', key: '14'},
    {number: '09', person: 'Triplets', action: 'drinking', object: 'milk', key: '514'},
    {number: '10', person: 'Volk', action: 'howling', object: 'golden toilet paper', key: '25'},
    {number: '11', person: 'Simem', action: 'licking', object: 'popsicles', key: '52'},
    {number: '12', person: 'James Bond', action: 'running', object: 'flamingos', key: '15'},
    {number: '13', person: 'Triplets', action: 'drinking', object: 'milk', key: '53'},
    {number: '14', person: 'Volk', action: 'howling', object: 'golden toilet paper', key: '26'},
    {number: '15', person: 'Simem', action: 'licking', object: 'popsicles', key: '34'},
    {number: '16', person: 'James Bond', action: 'running', object: 'flamingos', key: '16'},
    {number: '17', person: 'Triplets', action: 'drinking', object: 'milk', key: '32'},
    {number: '18', person: 'Volk', action: 'howling', object: 'golden toilet paper', key: '27'},
    {number: '19', person: 'Simem', action: 'licking', object: 'popsicles', key: '232'},
  ]);
  
  return (
    <View className="rounded h-full flex flex-col justify-start">
     <TableHeader />
      <View className="bg-white">
        <RenderList sets={sets} />
        </View>
    </View>
  )
}

export default PaotableScreen
