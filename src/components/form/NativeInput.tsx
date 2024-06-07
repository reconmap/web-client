import styles from './NativeInput.module.scss';

const NativeInput = ({ children, ...props }: any) => {
    return <input className={styles.native} {...props} />
}

export default NativeInput;