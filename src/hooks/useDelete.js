import secureApiFetch from '../services/api'
import {actionCompletedToast} from '../utilities/toast'

export default function useDelete(endpoint, successCallback = null, confirmationMessage = `Do you really want to delete this item?`, deleteMessage = 'The item has been deleted.') {

    return async (id) => {
        if (window.confirm(confirmationMessage)) {
            try {
                await secureApiFetch(`${endpoint}${id}`, {method: 'DELETE'})
                if (successCallback) {
                    successCallback();
                }
                actionCompletedToast(deleteMessage);
                return true;
            } catch (err) {
                console.error(err)
            }
        } else {
            return false;
        }
    };
}
