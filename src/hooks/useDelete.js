import secureApiFetch from '../services/api'
import toast from '../utilities/toast'

export default function useDelete(endpoint, updateCb) {

    const destroy = async (id) => {
        if (window.confirm(`Do you really want to delete the element?`)) {
            try {
                await secureApiFetch(`${endpoint}${id}`, {method: 'DELETE'})
                updateCb()
                toast('Action completed', 'The element has been deleted.')
            } catch (e) {
                console.log(e)
            }
        }
    }

    return destroy

}
