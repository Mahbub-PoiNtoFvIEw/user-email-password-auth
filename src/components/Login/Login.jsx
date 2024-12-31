import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import auth from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginError, setLoginError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);

    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password =e.target.password.value;
        // reset error and success message
        setLoginError("");
        setSuccessMessage("");

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            if(result.user.emailVerified){
                setSuccessMessage("Login Successfully....!");
            }
            else{
                alert('check your mail and verified your email');
            }
        })
        .catch(error =>{
            setLoginError(error.message);
            console.error(error);
        })
        console.log(email, password);
    }

    const handleForgotPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide an email...', email);
            return;
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            console.log('Please provide valid email...');
            return;
        }

        // send validation email
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Check your email');
        })
        .catch(error =>{
            console.error(error.message);
        })
    }
    return (
        <div>
            <div className='mx-auto md:w-1/2 p-6 rounded-xl shadow-lg'>
                <h2 className='text-3xl mb-3'>Please Login...!!</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        className='mb-4 w-3/4 border p-3 rounded-xl' 
                        type="email" name='email' 
                        ref={emailRef}
                        placeholder='Enter your email...' 
                        required/>
                    <div className='relative'>
                        <input 
                            className='mb-1 w-3/4 border p-3 rounded-xl' 
                            type={showPassword ? "text" : "password"} 
                            name='password' 
                            placeholder='Enter your password...' 
                            required />
                        <span className='text-slate-600 text-2xl bg-slate-100 px-2 py-3 cursor-pointer absolute right-[158px] top-[1px] rounded-r-xl' onClick={() =>setShowPassword(!showPassword)}>
                            {
                                showPassword ?
                                <FiEyeOff/>
                                :
                                <FiEye/>
                            }
                        </span>
                    </div>
                    <div className='mb-4'><a onClick={handleForgotPassword} href="#">Forgot Password?</a></div>
                    <input className='btn btn-secondary w-3/4 text-2xl font-bold' type="submit" value="Login..!" />
                </form>
                {
                    successMessage && <p className='text-green-600 mt-3'>{successMessage}</p>
                }
                {
                    loginError && <p className='text-red-600 mt-3'>{loginError}</p>
                }
                <p className='mt-2'>New in this website? please <Link className='text-red-600 font-bold' to={`/register`}>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;