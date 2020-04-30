import { comps } from "../constants/constants"
import { signIn, signUp } from "../actions/authActions"
import { useDispatch } from "react-redux"
import { DefaultInputedValuesTypes } from '../components/InputFieldsComp'

export enum form_res_msg {
  no_err = 'no error',
  empty_username = 'username is empty',
  empty_password = 'password is empty',
  empty_email = 'email is empty',
  empty_all = 'fields are empty',
  empty_password_and_email = 'password and email are empty',
  empty_password_and_username = 'username and password are empty',
  empty_email_and_username = 'username and email are empty',
  invalid_credentials = 'incorrect username or passowrd',
  //backend related
  signed_in = 'signed in',
  signed_up = 'signed up',
  username_exists = 'username already exists',
  password_incorrect_format = 'password must be at least 6 characters long',
  email_incorrect_format = 'invalid email',
  email_exists = "there're already an account under that email",
}


const useUserAuthentication = () => {
  const dispatch: any = useDispatch()

  const validate_inputs = async (collection_of_inputs: DefaultInputedValuesTypes, enteringMethod) => {
    if (enteringMethod === comps.signin) {
      switch (true) {

        case (collection_of_inputs.username !== '' && collection_of_inputs.password !== ''):
          return dispatch(signIn({
            username: collection_of_inputs.username,
            password: collection_of_inputs.password
          }))

        case (collection_of_inputs.username === '' && collection_of_inputs.password !== ''):
          return form_res_msg.empty_username

        case (collection_of_inputs.username !== '' && collection_of_inputs.password === ''):
          return form_res_msg.empty_password

        case (collection_of_inputs.username === '' && collection_of_inputs.password === ''):
          return form_res_msg.empty_all

        default:
          break;
      }
    }

    if (enteringMethod === comps.signup) {
      switch (true) {

        case (collection_of_inputs.username !== '' && collection_of_inputs.password !== '' && collection_of_inputs.email !== ''):
          return dispatch(signUp({
            username: collection_of_inputs.username,
            password: collection_of_inputs.password,
            email: collection_of_inputs.email
          }))

        case (collection_of_inputs.username === '' && collection_of_inputs.password !== '' && collection_of_inputs.email !== ''):
          return form_res_msg.empty_username

        case (collection_of_inputs.username !== '' && collection_of_inputs.password === '' && collection_of_inputs.email !== ''):
          return form_res_msg.empty_password

        case (collection_of_inputs.username !== '' && collection_of_inputs.password !== '' && collection_of_inputs.email === ''):
          return form_res_msg.empty_email

        case (collection_of_inputs.password === '' && collection_of_inputs.username === '' && collection_of_inputs.email === ''):
          return form_res_msg.empty_all

        case (collection_of_inputs.password === '' && collection_of_inputs.username !== '' && collection_of_inputs.email === ''):
          return form_res_msg.empty_password_and_email

        case (collection_of_inputs.password === '' && collection_of_inputs.username === '' && collection_of_inputs.email !== ''):
          return form_res_msg.empty_password_and_username

        case (collection_of_inputs.password !== '' && collection_of_inputs.username === '' && collection_of_inputs.email === ''):
          return form_res_msg.empty_email_and_username

        default:
          console.log('wrong')
          break;
      }
    }
  }

  return { validate_inputs }
}
export default useUserAuthentication