import MD5 from '../../services/md5';

export default function UserAvatar({email, size = '--iconSize', onClick, name, tooltip}) {
    const styles = {
        figure: {
            position: 'relative',
            padding: '0',
            borderRadius: '50%',
            overflow: 'hidden',
        },
        image: {
            width: `var(${size})`,
            height: `var(${size})`,
            borderRadius: '50%',
        },
    }
    return (
        <button onClick={onClick} style={styles.figure} data-tooltip={name}>
            {email && <img alt={name || 'Avatar'} style={styles.image}
                           src={`https://www.gravatar.com/avatar/${MD5(email)}?s=200&d=robohash`}/>}
        </button>
    )
}
