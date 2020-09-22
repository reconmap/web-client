import React from "react";

const ButtonGroup = ({children}) => {
    return <div className='flex justify-end space-x-2'>
        {children}
    </div>
}

export default ButtonGroup