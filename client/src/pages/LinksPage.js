import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {authContext} from "../context/context";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";


export const LinksPage = () => {
    const {loading, request} = useHttp();
    const {token} = useContext(authContext)
    const [links, setLinks] = useState(null)

    const getLinks = useCallback(
        async () => {
            const data = await request(`/api/link/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(data)
        },
        [request,token],
    );

    useEffect(() => {
        getLinks()
    },[getLinks])


    if(loading){
        return (<Loader/>);
    }

    return (
        <>
            {links && <LinksList links={links} />}
        </>

    )
}