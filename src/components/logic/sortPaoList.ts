import { fabActions } from '../../constants/constants'
import shuffle from 'shuffle-array'

export const sortPaoList = ({ list, mode }: { list, mode: fabActions }) => {
  //first put them in order then do the operations
  list.sort(compare);
  if (mode === fabActions.random) {
    return shuffle(list)
  } else if (mode === fabActions.accending) {
    return list
  } else if (mode === fabActions.deccending) {
    return list.reverse()
  }
  else return list
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const paoA = a.number
  const paoB = b.number

  let comparison = 0
  if (paoA > paoB) {
    comparison = 1
  } else if (paoA < paoB) {
    comparison = -1
  }
  return comparison
}


/* returns [
  { name: 'Steven Tyler', band: 'Aerosmith',  born: 1948 },
  { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 },
  { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 },
  { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 }
] */


export const mergePaoArrays = (firstArray: any, secondArray: any) => { //seperate component for cleanliness but change the name
  const firstArrayCut = firstArray.filter((document: any) => {
    if (document.number >= 0 && document.number <= 99) {
      return document
    }
  })
  const margedArr = secondArray.map((document: any, index: number) => {
    const docExists = firstArrayCut.filter((doc: any) => doc.number === document.number)[0]
    if (docExists) return docExists
    else return document
  })
  return margedArr
}

export default sortPaoList
