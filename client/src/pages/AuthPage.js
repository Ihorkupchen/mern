import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {authContext} from "../context/context";


export const AuthPage = () => {

    const [value, setValue] = useState( {email: '', password: ''});
    const message = useMessage()
    const {login} = useContext(authContext)
    const {request, loading, clearError, error} = useHttp();


    useEffect(() => {
        message(error);         
        clearError()
    },[error, message,clearError])

    const onChangeHandler = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    }

    const  loginHandler = async () => {

        try{
            const data = await request('/api/auth/login', 'POST', {...value});
            login(data.token, data.userId)

        } catch (e) { }
    }

    const  registerHandler = async () => {

        try{
            const data = await request('/api/auth/register', 'POST', {...value});
            message(data.message)

        } catch (e) { }
    }

    return (
        <div className='row'>
            <div className='col s10 l8 offset-s1 offset-l2 '>
                <div className= 'auth-header'>
                    <h3>Сократи ссылку</h3>
                </div>
                <div className="card blue-grey darken-1 hoverable">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div className="input-field">
                            <input
                                id="email"
                                type="text"
                                name='email'
                                onChange={onChangeHandler}
                            />
                                <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field ">
                            <input
                                id="password"
                                type="password"
                                name='password'
                                onChange={onChangeHandler}
                            />
                                <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="card-action auth-btns" >
                        <button
                            className="btn waves-effect waves-light"
                            onClick={loginHandler}
                        > Войти
                            <i className="material-icons right">check</i>
                        </button>
                        <button
                            className="btn waves-effect waves-light"
                            onClick={registerHandler}
                        >
                            Регистрация
                            <i className="material-icons right">add</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

