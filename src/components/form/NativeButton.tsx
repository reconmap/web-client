import styles from './NativeButton.module.scss';

const NativeButton = ({ children, ...props }: any) => {
    return <button className={styles.native} {...props}>{children}</button>
}

export default NativeButton;
