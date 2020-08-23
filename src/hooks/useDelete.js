import React, { useEffect } from 'react'
import secureApiFetch from '../services/api'

export default function useDelete(endpoint, updateCb ) {

    const destroy = async (id) => {
        if (window.confirm(`Do you really want to delete the element?`)) {
            try {
                await secureApiFetch(`${endpoint}${id}`, { method: 'DELETE' })
                updateCb()
            } catch(e) {
                console.log(e)
            }
        }
    }

    return destroy

}
