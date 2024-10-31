import styles from './NativeButton.module.css';

const NativeButton = ({ children, ...props }: any) => {
    return <button className={styles.native} {...props}>{children}</button>
}

export default NativeButton;
