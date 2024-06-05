import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFields } from '../../../assets/types';
import { Link } from 'react-router-dom';
import './login.css'
import axios from 'axios';

const API = 'https://summer-api/login'

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<LoginFields>({
        mode: 'onChange',
    });

    const OnSubmit: SubmitHandler<LoginFields> = data => {
        axios.post(API, data)
    .then(response => {
      console.log('Success:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(OnSubmit)} className='login-card'>
                <h1>LOGIN PAGE</h1>
                <p>Nickname</p>
                <input {...register('nickname', {
                    required: "Please enter nickname",
                    minLength: 5,
                    maxLength: 15,
                })}
                    placeholder='Enter ur nickname...'
                    type='text'
                />
                <div>{errors?.nickname && <div>{errors.nickname.message}</div>}</div>

                <p>Password</p>
                <input {...register('password', {
                    required: "Please enter password",
                    minLength: 8,
                    maxLength: 20,
                })}
                    placeholder='Enter ur pass...'
                    type='password'
                />
                <div>{errors?.password && <div>{errors.password.message}</div>}</div>
                <p>Don`t have an account (<Link className='NavLink' to="/registration">Registration</Link>)
                </p>
                <button className='btn-log'>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;