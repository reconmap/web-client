import React from 'react';

const Timestamps = ({insertTs, updateTs}) => {
    return <>
        <div>
            <strong>Creation time:</strong> {insertTs}.
            {updateTs && <> <strong>Modification time:</strong> {updateTs}</>}
        </div>
    </>
}

export default Timestamps