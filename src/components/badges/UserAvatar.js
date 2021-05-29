import { Avatar } from '@chakra-ui/avatar';
import MD5 from '../../services/md5';

const UserAvatar = ({ email, size = 'sm', onClick  }) => {
   
    return (
        <Avatar
            onClick={onClick}
            name={email}
            size={size}
            backgroundColor={"gray.700"}
            src={`https://www.gravatar.com/avatar/${MD5( email )}?s=200&d=robohash`}
        />

    )
}

export default UserAvatar;
