import React from 'react'

const UserPreferences = () => {
    return (
        <>

            <form action="../dashboard.html">
                <div>
                    Language
                    <select>
                        <option>English</option>
                        <option>Spanish</option>
                    </select>
                </div>

                <div>
                    Timezone
                    <select>
                        <option>UTC-4</option>
                        <option>UTC</option>
                    </select>
                </div>

                <button>Save</button>
            </form>
        </>
    )
}

export default UserPreferences
