import { useState, useEffect } from 'react';
import { API_URL } from "../helper";
import Axios from "axios";

export const useUserData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get(`${API_URL}/users`)
            .then((response) => {
                setData(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    return [
        ...data
    ]
};




