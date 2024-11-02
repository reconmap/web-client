import styles from './NativeTextArea.module.css';

const NativeTextArea = ({ children, ...props }: any) => {
    
    return <textarea className={`textarea ${styles.native}`} {...props}>{children}</textarea>
}

export default NativeTextArea;