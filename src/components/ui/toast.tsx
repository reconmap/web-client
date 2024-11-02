import toast from "react-hot-toast";

export function actionCompletedToast(description: string) {
    toast.success(
        <div>
            <h4>Action completed</h4>
            {description}
        </div>,
        {
            duration: 4000,
            position: "bottom-right",
            isClosable: true,
        },
    );
}

export function errorToast(description: string) {
    toast.error(<div>
        <h4>An error has occurred</h4>
        {description}
    </div>, {
        position: "bottom-right",
        isClosable: false,
    });
}
