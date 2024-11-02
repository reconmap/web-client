import styles from './NativeInput.module.css';

const NativeInput = ({ children, ...props }: any) => {
    return <input className={`input ${styles.native}`} {...props} />
}

export default NativeInput;