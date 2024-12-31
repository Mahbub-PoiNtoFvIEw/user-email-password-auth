import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase.config';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Register = () => {
    const [registerError, setRegisterError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [acceptedCondition, setAcceptedCondition] = useState(false);

    const handleRegister = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password,accepted);
        // reset error
        setRegisterError("");
        // reset success message
        setSuccessMessage("");

        // password validation
        if(password.length < 6){
            setRegisterError("Password should be at least 6 characters or longer");
            return;
        }
        // password validation with at least one uppercase
        else if(!/[A-Z]/.test(password)){
            setRegisterError("password have to be at least one upper case");
            return;
        }
        // checkBox validation 
        else if(!accepted){
            setRegisterError("Please accept our terms and condition");
            return;
        }

        // create users
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            setSuccessMessage("User Create Successfully");
        })
        .catch(error =>{
            console.error(error);
            setRegisterError(error.message);
            // setRegisterError("User Already Exists");
        })
    }

    // check if accept condition button will be enabled;
    const handleTermsCondition = e =>{
        const acceptedTerms = e.target.checked;
        setAcceptedCondition(acceptedTerms);
        console.log(acceptedTerms);
    }
    return (
        <div>
            <div className='mx-auto md:w-1/2 p-6 rounded-xl shadow-lg'>
                <h2 className='text-3xl mb-3'>Please Register...!!</h2>
                <form onSubmit={handleRegister}>
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
                    <div className='flex items-center mb-3'>
                        <input onChange={handleTermsCondition} className='mr-2' type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms">Accept our <a href="">Terms and conditions</a></label>
                    </div>
                    <input className='btn btn-secondary w-3/4 text-2xl font-bold' type="submit" value="Register..!" disabled={!acceptedCondition} />
                </form>
                {
                    successMessage && <p className='text-green-600 mt-3'>{successMessage}</p>
                }
                {
                    registerError && <p className='text-red-600 mt-3'>{registerError}</p>
                }
            </div>
        </div>
    );
};

export default Register;