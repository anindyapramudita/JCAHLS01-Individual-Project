import { useState, useEffect } from 'react';
import { API_URL } from "../helper";
import Axios from "axios";

export const useUserPosts = (id) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!id) {
            return undefined;
        }

        Axios.get(`${API_URL}/users?id=${id}`)
            .then((response) => {
                setData(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [id])

    const posts = data.find(entry => entry.id === id)?.posts;

    return {
        posts,
    }
};




