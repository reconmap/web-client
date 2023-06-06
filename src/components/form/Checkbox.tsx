
const Checkbox = ({ children, ...props }: any) => {
    return <label><input type="checkbox" {...props} /> {children}</label>
}

export default Checkbox;
