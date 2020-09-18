import {useState, useCallback, useEffect} from 'react';

const currentSession = 'currentSession';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);



    const login = useCallback( (jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        window.localStorage.setItem(currentSession, JSON.stringify({
            token: jwtToken, userId:id
        }));
    },[])

    const logout = useCallback( () => {
        setToken(null);
        setUserId(null);
        window.localStorage.removeItem(currentSession);
    },[])

    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem(currentSession));

        if(data && data.token){
            login(data.token, data.userId)
        }
    },[login])


    return {login, logout, token, userId}
}