import { actionCompletedToast, errorToast } from '../components/ui/toast';
import secureApiFetch from '../services/api';

const useDelete = (endpoint, successCallback = null, confirmationMessage = `Do you really want to delete this item?`, deleteMessage = 'The item has been deleted.') => {

    return async (id) => {
        if (window.confirm(confirmationMessage)) {
            try {
                const response = await secureApiFetch(`${endpoint}${id}`, { method: 'DELETE' })
                if (response.ok) {
                    if (successCallback) {
                        successCallback();
                    }
                    actionCompletedToast(deleteMessage);
                    return true;
                }

                errorToast(response.statusText);
                return false;
            } catch (err) {
                console.error(err)
            }
        } else {
            return false;
        }
    };
}

export default useDelete;
