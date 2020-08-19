import React from 'react'

const UserPreferences = () => {
    return (
        <>

            <form action="../dashboard.html" onSubmit={e=>e.preventDefault()}>
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

                <button>Save</button>
                <button type='cancel'>Cancel</button>
            </form>
        </>
    )
}

export default UserPreferences
