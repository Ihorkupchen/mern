import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {authContext} from "../context/context";
import {useHistory} from 'react-router-dom'


export const CreatePage = () => {

    const history = useHistory()
    const auth =  useContext(authContext)
    const {request} = useHttp();
    const [link, setLink] = useState()


    const onChangeHandler = (e) => {
        setLink(e.target.value)
    }

    const onKeyPressHandler = async (e) => {
        try{
            if(e.key === 'Enter') {

                const data = await request('/api/link/generate', 'POST', {from: link},{
                    authorization: `Bearer ${auth.token}`
                })
                console.log(data)
                history.push(`/detail/${data.link._id}`)
            }
        } catch (e) {

        }

    }

    return (
        <div>
            <div className="row">
                <div className="col s8 offset-s2">
                    <div className="input-field">
                        <input
                            id="email"
                            type="text"
                            name='email'
                            value={link}
                            onChange={onChangeHandler}
                            onKeyPress={onKeyPressHandler}
                        />
                        <label htmlFor="email">Вставте ссылку</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
