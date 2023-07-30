
import styles from './NativeSelect.module.scss';

const NativeSelect = ({ children, ...props }) => {

    return <select className={styles.native} {...props}>{children}</select>
}

export default NativeSelect;
