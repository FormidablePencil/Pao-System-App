import shuffle from "shuffle-array"

const randomlyGeneratedPaoList = ({ pao }) => {
  let unshuffledPersonList = []
  let unshuffledActionList = []
  let unshuffledObjectList = []
  pao.map((collection, index) => {
    // if (index >= studyAmount - 1) return
    const person = { item: collection.person, number: collection.number }
    unshuffledPersonList.push(person)
    const action = { item: collection.action, number: collection.number }
    unshuffledActionList.push(action)
    const object = { item: collection.object, number: collection.number }
    unshuffledObjectList.push(object)
  })
  const shuffledPersonList = shuffle(unshuffledPersonList)
  const shuffledActionList = shuffle(unshuffledActionList)
  const shuffledObjectList = shuffle(unshuffledObjectList)

  // const person = shuffledPersonList.splice(0, studyAmount)
  // const action = shuffledActionList.splice(0, studyAmount)
  // const object = shuffledObjectList.splice(0, studyAmount)

  return {
    person: shuffledPersonList,
    action: shuffledActionList,
    object: shuffledObjectList
  }
}

export default randomlyGeneratedPaoList