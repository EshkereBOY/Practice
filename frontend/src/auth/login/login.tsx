import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFields } from '../../assets/types';
import './login.css'


const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginFields>({
        mode: 'onChange',
    });

    const OnSubmit: SubmitHandler<LoginFields> = data => {
        // TODO: дописать отправку на сервер  
        console.log(data);
    };

    const password = watch('password'); // Наблюдаем за полем пароля

    return (
        <div className='main-card'>
            <form onSubmit={handleSubmit(OnSubmit)}>
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

                <p>password</p>
                <input {...register('password', {
                    required: "Please enter password",
                    minLength: 8,
                    maxLength: 20,
                })}
                    placeholder='Enter ur pass...'
                    type='password'
                />
                <div>{errors?.password && <div>{errors.password.message}</div>}</div>
                
                <button>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;