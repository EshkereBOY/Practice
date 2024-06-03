import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { RegistrationFields } from '../../assets/types';
import './reg_index.css'


const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegistrationFields>({
        mode: 'onChange',
    });

    const OnSubmit: SubmitHandler<RegistrationFields> = data => {
        // TODO: дописать отправку на сервер  
        console.log(data);
    };

    const password = watch('password'); // Наблюдаем за полем пароля

    return (
        <div className='main-card'>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <h1>REGISTRATION</h1>
                <p>nickname</p>
                <input {...register('nickname', {
                    required: "Please enter nickname",
                    minLength: 5,
                    maxLength: 15,
                })}
                    placeholder='Enter ur nickname...'
                    type='text'
                />
                <div>{errors?.nickname && <div>{errors.nickname.message}</div>}</div>
                <p>email</p>
                <input {...register('email', {
                    required: "Please enter email",
                    minLength: 5,
                    maxLength: 25,
                })}
                    placeholder='Enter ur email...'
                    type='email'
                />
                <div>{errors?.email && <div>{errors.email.message}</div>}</div>

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
                <p>confirm password</p>
                <input {...register('confirmPassword', {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match" // Валидация совпадения паролей
                })}
                    placeholder='Confirm your pass...'
                    type='password'
                />
                <div>{errors?.confirmPassword && <div>{errors.confirmPassword.message}</div>}</div>
                <button>Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;