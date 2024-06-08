import styles from './NativeTextArea.module.scss';

const NativeTextArea = ({ children, ...props }: any) => {
    return <textarea className={styles.native} {...props}>{children}</textarea>
}

export default NativeTextArea;