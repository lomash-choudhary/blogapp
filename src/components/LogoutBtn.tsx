import { useDispatch } from 'react-redux'
import authServiceObject from '../appwrite/auth_service'
import { logout } from '../features/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authServiceObject.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {
            console.log(`Error while logging out the user ${error}`)
        })    
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logOutHandler}>Logout</button>
  )
}

export default LogoutBtn