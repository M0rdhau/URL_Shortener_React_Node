import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from '../hooks/useForm'
import { setNotification } from '../reducers/notificationReducer'
import registerService from '../services/register'

const Register = (props) => {
  const [values, handleChange, reset] = useForm({ username: '', password: '', confirmPassword: '' })
  const [areEqual, setAreEqual] = useState(true)

  const dispatch = useDispatch()

  const handleRegister = async () => {
    if(areEqual){
      try{
        await registerService.register(values.username, values.password)
        dispatch(setNotification('Registration success!', false))
        reset()
        props.toggle()
      }catch (e){
        dispatch(setNotification(e.response.headers.error))
      }
    }
  }

  const onConfirmPasswordChange = (event) => {
    setAreEqual(event.target.value === values.password)
    handleChange(event)
  }

  return(
    <div className="loginForm">
      {!areEqual && <p> Passwords must match! </p>}
      <label htmlFor='username'>Username: </label>
      <input name='username' value={values.username} onChange={handleChange} />
      <label htmlFor='password'>Password: </label>
      <input
        name='password'
        type='password'
        value={values.password}
        onChange={handleChange} />
      <label htmlFor='confirmPassword'>Confirm Password:</label>
      <input
        name='confirmPassword'
        type='password'
        value={values.confirmPassword}
        onChange={onConfirmPasswordChange} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={props.toggle}>Or Log In</button>
    </div>
  )

}

export default Register
