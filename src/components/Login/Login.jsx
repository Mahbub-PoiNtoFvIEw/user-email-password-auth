import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import auth from '../../firebase/firebase.config';

const Login = () => {
    const [loginError, setLoginError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password =e.target.password.value;
        // reset error and success message
        setLoginError("");
        setSuccessMessage("");

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            setSuccessMessage("Login Successfully....!");
            console.log(result.user);
        })
        .catch(error =>{
            setLoginError(error.message);
            console.error(error);
        })
        console.log(email, password);
    }
    return (
        <div>
            <div className='mx-auto md:w-1/2 p-6 rounded-xl shadow-lg'>
                <h2 className='text-3xl mb-3'>Please Login...!!</h2>
                <form onSubmit={handleLogin}>
                    <input className='mb-4 w-3/4 border p-3 rounded-xl' type="email" name='email' placeholder='Enter your email...' required/>
                    <div className='relative'>
                        <input 
                            className='mb-4 w-3/4 border p-3 rounded-xl' 
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
                    {/* <div className='flex items-center mb-3'>
                        <input onChange={handleTermsCondition} className='mr-2' type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms">Accept our <a href="">Terms and conditions</a></label>
                    </div> */}
                    <input className='btn btn-secondary w-3/4 text-2xl font-bold' type="submit" value="Register..!" />
                </form>
                {
                    successMessage && <p className='text-green-600 mt-3'>{successMessage}</p>
                }
                {
                    loginError && <p className='text-red-600 mt-3'>{loginError}</p>
                }
            </div>
        </div>
    );
};

export default Login;