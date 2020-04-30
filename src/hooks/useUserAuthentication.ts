import { comps } from "../constants/constants"
import { signIn, signUp } from "../actions/authActions"
import { useDispatch } from "react-redux"
import { DefaultInputedValuesTypes } from '../components/InputFieldsComp'

export enum ErrMsg {
  empty_username = 'username is empty',
  empty_password = 'password is empty',
  empty_email = 'email is empty',
  empty_all = 'empty fields',
  no_err = 'no error',
} 

const useUserAuthentication = () => {
  const dispatch = useDispatch()

  const validateInputs = async (collection_of_inputs: DefaultInputedValuesTypes, enteringMethod) => {
    if (enteringMethod === comps.signin) {
      switch (true) {

        case (collection_of_inputs.username !== '' && collection_of_inputs.password !== ''):
          return dispatch(signIn({
            username: collection_of_inputs.username,
            password: collection_of_inputs.password
          }))

        case (collection_of_inputs.username === '' && collection_of_inputs.password !== ''):
          return ErrMsg.empty_username

        case (collection_of_inputs.username !== '' && collection_of_inputs.password === ''):
          return ErrMsg.empty_password

        case (collection_of_inputs.username === '' && collection_of_inputs.password === ''):
          return ErrMsg.empty_all

        default:
          break;
      }
    }

    if (enteringMethod === comps.signup) {
      switch (true) {

        case (collection_of_inputs.username !== '' && collection_of_inputs.password !== ''):
          return dispatch(signUp({
            username: collection_of_inputs.username,
            password: collection_of_inputs.password,
            email: collection_of_inputs.email
          }))

        case (collection_of_inputs.username !== '' && collection_of_inputs.password === '' && collection_of_inputs.email === ''):
          return ErrMsg.empty_username

        case (collection_of_inputs.username === '' && collection_of_inputs.password !== '' && collection_of_inputs.email === ''):
          return ErrMsg.empty_password

        case (collection_of_inputs.username !== '' && collection_of_inputs.password !== '' && collection_of_inputs.email === ''):
          return ErrMsg.empty_email

        case (collection_of_inputs.password !== '' && collection_of_inputs.username !== '' && collection_of_inputs.email !== ''):
          return ErrMsg.empty_all

        default:
          break;
      }
    }
  }

  return { validateInputs }
}
export default useUserAuthentication