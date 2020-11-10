import secureApiFetch from '../services/api'
import {actionCompletedToast} from '../utilities/toast'

export default function useDelete(endpoint, updateCb) {

    const destroy = async (id) => {
        if (window.confirm(`Do you really want to delete the element?`)) {
            try {
                await secureApiFetch(`${endpoint}${id}`, {method: 'DELETE'})
                updateCb()
                actionCompletedToast('The element has been deleted.');
            } catch (err) {
                console.error(err)
            }
        }
    }

    return destroy

}
