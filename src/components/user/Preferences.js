import React from 'react'
import useSetTitle from '../../hooks/useSetTitle'
import { IconSave, IconX } from './../icons'

const UserPreferences = () => {
    useSetTitle('Preferences')
    return (
        <>
            <h1>Preferences</h1>
            <form onSubmit={e=>e.preventDefault()}>
                    <label>Language</label>
                    <select>
                        <option>English</option>
                        <option>Spanish</option>
                    </select>

                    <label>Timezone</label>
                    <select>
                        <option>UTC-4</option>
                        <option>UTC</option>
                    </select>

                <button className='flex '><IconSave styling='mr-2'/> Save</button>
                <button className='flex ' type='cancel'><IconX styling='mr-2'/> Cancel</button>
            </form>
        </>
    )
}

export default UserPreferences
