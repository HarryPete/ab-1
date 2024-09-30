'use client'

import styles from './Register.module.css'
import Image from 'next/image';
import successicon from '../../assets/success-icon.png'
import erroricon from '../../assets/error-icon.png'
import { CircularProgress, TextField } from '@mui/material';
// import { credentialLogin, googleLogin } from '@/app/action';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '@/assets/logo.png'
import GoogleAuth from '../components/googleAuth/GoogleAuth';
import { Input } from '@/components/ui/input';

const Signup = () =>
{   
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ error, setError ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('')
    const [ success, setSuccess ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setSuccess(false)
        setSuccessMessage('')

        const formData = new FormData(e.currentTarget);

        if(!formData.get('name')) 
        {
            setError(true);
            setErrorMessage('Name is required')
            return
        } 

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

        if(formData.get('password').length < 6) 
        {
            setError(true);
            setErrorMessage('Password is too short')
            return
        } 

        setError(false)
        setErrorMessage('');
        setIsLoading(true);

        try
        {
            const url = '/api/user/signup'
            const response = await axios.post(url, 
                {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                })
            if(response.data.status !== 201)
            {
                setError(true)
                setErrorMessage(response.data.message)
            }
            else
            {
                setSuccess(true)
                setSuccessMessage(response.data.message)
                setTimeout(()=>
                {
                    router.push('/login')
                },500)
            }
        }
        catch(error)
        {
            setError(true)
            setErrorMessage(error.message)
        }
        setIsLoading(false);
    }

    return(
        <div className={styles.wrapper}>
            {/* <Header/> */}
           <div className={styles.container}> 
                <div className={styles.header}>
                    <Image src={logo} className={styles.title} onClick={()=> router.push('/')}/>
                </div>
                <div className={styles.form}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.group}>
                        <p className={styles.label}>Name</p>
                        <Input className={styles.input} type="text" placeholder="MockHub" name='name' />
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Email</p>
                        <Input className={styles.input} type="email" placeholder="admin@mockhub.com" name='email'/>
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Password</p>
                        <Input className={styles.input} type="text" placeholder='******' name='password' />
                    </div>
                    
                        {/* <TextField className={styles.inputs} size='small' color='grey' label="Name" type="text" name="name" variant='filled' />
                        <TextField className={styles.inputs} size='small' color='grey' label="Email" type="text" name="email" variant='filled' />
                        <TextField className={styles.inputs} size='small' color='grey' label="Password" type="text" name="password" variant='filled' /> */}
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
                        {isLoading ? 
                        <div className={styles.progress}>
                            <CircularProgress sx={{color:"rgb(0, 177, 94)"}}/> 
                        </div>: 
                        <button className={styles.submit} type='submit'>Sign up</button>}
                    </form>
                    <p className={styles.option}>or</p>
                    <GoogleAuth/>
                </div>
                <p className={styles.noaccount} onClick={()=> router.push('/login')}>Already a user? <span className={styles.link}>Login</span></p>
           </div>
        </div>
    )
}

export default Signup