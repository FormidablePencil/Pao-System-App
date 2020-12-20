export enum PaoTypesT {
  person = 'person',
  action = 'action',
  object = 'object'
}

const ascertainPaoType = ({ evalNum, correctNumbers }) => {
  switch (true) {
    case evalNum === correctNumbers[0]: return PaoTypesT.person
    case evalNum === correctNumbers[1]: return PaoTypesT.action
    case evalNum === correctNumbers[2]: return PaoTypesT.object
    default:
      break;
  }
}

export default ascertainPaoType