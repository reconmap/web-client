const NativeSelect = ({ children, ...props }) => {
    return (
        <div className="select">
            <select {...props}>{children}</select>
        </div>
    );
};

export default NativeSelect;
