import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState()
    const fetchData = async () => {
        try {
            const headers = { 'content-type':'application/json'}
            const response = await fetch(url, { 
                method: 'GET',
                headers: headers
            })
            const responseJSON = await response.json()
            setData(responseJSON)
        } catch (e) { console.log('error => ',e) }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, fetchData}
}

export default useFetch
