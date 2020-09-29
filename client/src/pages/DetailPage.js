import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import {authContext} from "../context/context";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";


export const DetailPage = () => {
    const {loading, request} = useHttp();
    const {token} = useContext(authContext)
    const linkId = useParams().id;
    const [link, setLink] = useState(null)

    const rerender = () => {
        getLink()
    }

    const getLink = useCallback(
        async () => {
            const data = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(data)
        },
        [request,linkId,token],
    );

    useEffect(() => {
        getLink()
    },[getLink])


    if(loading){
        return (<Loader/>);
    }

    return (
        <>
            {link && <LinkCard link={link} clickHandler={rerender} />}
        </>

    )
}