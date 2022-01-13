import { BellIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTitle from 'components/logic/PageTitle';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import RelativeDateFormatter from 'components/ui/RelativeDateFormatter';
import LoadingTableRow from 'components/ui/tables/LoadingTableRow';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import secureApiFetch from 'services/api';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';

const NotificationsList = () => {
    const [notifications, fetchNotifications] = useFetch('/notifications')

    const markNotificationAsRead = notification => {
        secureApiFetch(`/notifications/${notification.id}`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'read' })
        }).then(() => {
            fetchNotifications();
        })
    }

    const deleteNotification = useDelete('/notifications/', fetchNotifications);

    return <>
        <PageTitle value="Notifications" />
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title title='Notifications' icon={<BellIcon />} />

        <Table>
            <Thead>
                <Tr>
                    <Th w={50}>&nbsp;</Th>
                    <Th w={200}>Date/time</Th>
                    <Th>Content</Th>
                    <Th>&nbsp;</Th>
                </Tr>
            </Thead>
            <Tbody>
                {null === notifications && <LoadingTableRow numColumns={3} />}
                {null !== notifications && notifications.length === 0 && <NoResultsTableRow numColumns={3} />}
                {null !== notifications && notifications.length > 0 &&
                    notifications.map(notification =>
                        <Tr key={notification.id}>
                            <Th>{notification.status === 'read' ? <FontAwesomeIcon icon={faCheck} /> : <>&nbsp;</>}</Th>
                            <Td><RelativeDateFormatter date={notification.insert_ts} /></Td>
                            <Td>
                                <strong>{notification.title}</strong>
                                <div>{notification.content}</div>
                            </Td>
                            <Td className='flex justify-end'>
                                <ButtonGroup>
                                    {notification.status === 'unread' && <Button onClick={() => markNotificationAsRead(notification)} leftIcon={<FontAwesomeIcon icon={faCheck} />}>Mark as read</Button>}
                                    <DeleteIconButton onClick={() => deleteNotification(notification.id)} />
                                </ButtonGroup>
                            </Td>
                        </Tr>
                    )
                }
            </Tbody>
        </Table>
    </>
}

export default NotificationsList;
