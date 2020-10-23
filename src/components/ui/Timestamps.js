
const Timestamps = ({insertTs, updateTs}) => {
    return <>
        <div>
            <strong>Creation time:</strong>&nbsp;
            <time dateTime={insertTs}>{insertTs}</time>
            .
            {updateTs && <> <strong>Modification time:</strong>
                &nbsp;
                <time dateTime={updateTs}>{updateTs}</time>
            </>}
        </div>
    </>
}

export default Timestamps