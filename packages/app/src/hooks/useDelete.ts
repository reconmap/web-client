import { actionCompletedToast, errorToast } from "../components/ui/toast.jsx";
import secureApiFetch from "../services/api.js";

const useDelete = (
    endpoint: string,
    successCallback: (() => void) | null = null,
    confirmationMessage = `Do you really want to delete this item?`,
    deleteMessage = "The item has been deleted.",
) => {
    return async (id: number) => {
        if (window.confirm(confirmationMessage)) {
            try {
                const response = await secureApiFetch(`${endpoint}${id}`, { method: "DELETE" });
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
                console.error(err);
            }
        } else {
            return false;
        }
    };
};

export default useDelete;
