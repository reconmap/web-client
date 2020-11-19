import secureApiFetch from '../services/api'
import {actionCompletedToast} from '../utilities/toast'

export default function useDelete(endpoint, updateCb, confirmationMessage = `Do you really want to delete this item?`, deleteMessage = 'The item has been deleted.') {

    return async (id) => {
        if (window.confirm(confirmationMessage)) {
            try {
                await secureApiFetch(`${endpoint}${id}`, {method: 'DELETE'})
                updateCb()
                actionCompletedToast(deleteMessage);
            } catch (err) {
                console.error(err)
            }
        }
    };
}
