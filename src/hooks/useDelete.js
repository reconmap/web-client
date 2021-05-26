import { actionCompletedToast } from '../components/ui/toast';
import secureApiFetch from '../services/api';

const useDelete = (endpoint, successCallback = null, confirmationMessage = `Do you really want to delete this item?`, deleteMessage = 'The item has been deleted.') => {

    return async (id) => {
        if (window.confirm(confirmationMessage)) {
            try {
                await secureApiFetch(`${endpoint}${id}`, { method: 'DELETE' })
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

export default useDelete;
