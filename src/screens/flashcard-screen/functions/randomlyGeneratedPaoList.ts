import shuffle from "shuffle-array"

const randomlyGeneratedPaoList = ({ pao, studyAmount }) => {
  let unshuffledPersonList = []
  let unshuffledActionList = []
  let unshuffledObjectList = []
  pao.map((collection, index) => {
    // if (index >= studyAmount - 1) return
    const person = { item: collection.person, number: collection.number }
    const action = { item: collection.action, number: collection.number }
    const object = { item: collection.object, number: collection.number }
    unshuffledPersonList.push(person)
    unshuffledActionList.push(action)
    unshuffledObjectList.push(object)
  })
  const shuffledPersonList = shuffle(unshuffledPersonList)
  const shuffledActionList = shuffle(unshuffledActionList)
  const shuffledObjectList = shuffle(unshuffledObjectList)

  // shuffledPersonList.splice(0, studyAmount)
  // shuffledActionList.splice(0, studyAmount)
  // shuffledObjectList.splice(0, studyAmount)

  return {
    person: shuffledPersonList,
    action: shuffledActionList,
    object: shuffledObjectList
  }
}

export default randomlyGeneratedPaoList