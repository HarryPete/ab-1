'use client'

import styles from './Login.module.css'
import Image from 'next/image';
import successicon from '../../assets/success-icon.png'
import erroricon from '../../assets/error-icon.png'
import { TextField } from '@mui/material';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import GoogleAuth from '../components/googleAuth/GoogleAuth';
import { credentialLogin } from '../action';

const Login = () =>
{   
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ error, setError ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('')
    const [ success, setSuccess ] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setSuccess(false)
        setSuccessMessage('')

        const formData = new FormData(e.currentTarget);

        if(!formData.get('email')) 
        {
            setError(true);
            setErrorMessage('Email is required')
            return
        } 

        if(!formData.get('password')) 
        {
            setError(true);
            setErrorMessage('Password is required')
            return
        } 

        setError(false)
        setErrorMessage('')

        try 
        {
            const response = await credentialLogin(formData);
            if(!response)
                return router.push('/dashboard')
            setError(true);
            setErrorMessage(response);
        } 
        catch(error) 
        {
            setError(true);
            setErrorMessage(error);
        }
    }

    return(
        <div className={styles.wrapper}>
            {/* <Header/> */}
           <div className={styles.container}> 
                <div className={styles.header}>
                    <p className={styles.title} onClick={()=> router.push('/')}><span className={styles.mock}>Mock</span> Hub</p>
                    <p className={styles.welcome}>Welcome back!</p>
                </div>
                <div className={styles.form}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <TextField className={styles.inputs} size='small' color='grey' label="Email" type="text" name="email" variant='filled'/>
                        <TextField className={styles.inputs} size='small' color='grey' label="Password" type="password" name="password" variant='filled'/>
                        {error && 
                        <div className={styles.error}>
                            <Image className={styles.erroricon} src={erroricon} alt='error'/>
                            <p className={styles.errorMessage}>{errorMessage}</p>
                        </div>}
                        {success && 
                        <div className={styles.success}>
                            <Image className={styles.successicon} src={successicon} alt='success'/>
                            <p className={styles.successMessage}>{successMessage}</p>
                        </div>}
                        <button className={styles.submit} type='submit'>Login</button>
                    </form>
                    <p className={styles.option}>or</p>
                    <GoogleAuth/>
                </div>
                <p className={styles.noaccount} onClick={()=> router.push('/signup')}>Don't have an account? <span className={styles.link}>Sign up</span></p>
           </div>
        </div>
    )
}

export default Login