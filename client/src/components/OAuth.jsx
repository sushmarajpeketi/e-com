import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import {signInSuccess} from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';

const OAuth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
    const handleGoogleClick = async () =>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log("Google OAuth result is",result)
            const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
              }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            toast.success("google-login success")
            navigate('/');
        }catch(err){
            console.log("couldnt sign-in with google")
            toast.error("Unable to Google signin")

        }

    }
  return (
    <button
    onClick={handleGoogleClick}
    type='button'
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
  >
    Continue with google
  </button>
  )
}

export default OAuth