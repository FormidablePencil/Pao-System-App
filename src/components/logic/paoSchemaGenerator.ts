import { PaoState } from "../../reducerTypes/paoTypes"

const paoSchemaGenerator = (obj): {number, person, action, object} => {
  let first: any
  let second: any
  if (obj.name === 'person') {
    first = 'action'
    second = 'object'
  }
  if (obj.name === 'action') {
    first = 'person'
    second = 'object'
  }
  if (obj.name === 'object') {
    first = 'person'
    second = 'action'
  }
  const modal = {
    number: obj.number,
    [obj.name]: obj.value,
    [first]: null,
    [second]: null,
  }
  return modal
}

export default paoSchemaGenerator