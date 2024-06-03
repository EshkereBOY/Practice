import React from 'react'
import axios, {isCancel, AxiosError} from 'axios';
import { useForm, SubmitHandler } from "react-hook-form"
import { IsShippingFields } from '../../assets/types';

const RegisterPage = () => {
    const {register,
         handleSubmit,
         formState: {errors,}} = useForm<IsShippingFields>({
        mode: 'onChange',
    })

    const OnSubmit: SubmitHandler<IsShippingFields> = data => {
        //TODO дописать отправку на сервер  
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <input {...register('nickname', {
                    required: "Please enter nickname",
                    minLength: 5,
                    maxLength: 15,
                }

                )}
                        placeholder='Enter ur nickname...'
                        type='text'
                />
                <div>{errors?.nickname && <div>{errors.nickname.message}</div>}</div>
                <input {...register('email', {
                    required: "Please enter email",
                    minLength: 5,   
                    maxLength: 25,
                }

                )}
                        placeholder='Enter ur email...'
                        type='email'
                />
                <div>{errors?.email && <div>{errors.email.message}</div>}</div>
                <input {...register('password', {
                    required: "Please enter password",
                    minLength: 8,
                    maxLength: 20,
                })}
                        placeholder='Enter ur pass...'
                        type='password'
                />
                <div>{errors?.password && <div>{errors.password.message}</div>}</div>
                <button>Register</button>
            </form>
        </div>
        
    )
}

export default RegisterPage