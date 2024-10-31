import styles from "./NativeSelect.module.css";

const NativeSelect = ({ children, ...props }) => {
    return (
        <select className={styles.native} {...props}>
            {children}
        </select>
    );
};

export default NativeSelect;
