import { fabActions } from '../../constants/constants'
import shuffle from 'shuffle-array'
import { arrangmentOpt } from '../../reducer/flashcardOptionsReducer';

export const sortPaoList = ({ list, order }: { list, order: arrangmentOpt }) => {
const listCopy = list.map(item => item)// can't mutate state so this is how we'd have to go about it 
  //first put them in order then do the operations
  listCopy.sort(compare);
  if (order === arrangmentOpt.random) {
    return shuffle(listCopy)
  } else if (order === arrangmentOpt.ascending) {
    return listCopy
  } else if (order === arrangmentOpt.descending) {
    return listCopy.reverse()
  }
  else return listCopy
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
