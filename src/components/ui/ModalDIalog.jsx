import { Divider } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import './ModalDialog.scss';

const ModalDialog = ({ title, children, visible, onModalClose, style = {} }) => {

    const htmlRef = useRef(null);

    const closeDialog = ev => {
        htmlRef.current?.close();
    }


    const isClickInsideRectangle = (e, element) => {
        const r = element.getBoundingClientRect();

        return (
            e.clientX > r.left &&
            e.clientX < r.right &&
            e.clientY > r.top &&
            e.clientY < r.bottom
        );
    };

    useEffect(() => {
        htmlRef.current?.addEventListener('close', onModalClose);
    }, [onModalClose])

    useEffect(() => {
        if (visible) {
            htmlRef.current?.showModal();
        } else {
            htmlRef.current?.close();
        }
    }, [visible])

    return <dialog ref={htmlRef} className="html-dialog" onClick={(ev) => htmlRef.current && !isClickInsideRectangle(ev, htmlRef.current) && closeDialog()} style={style}>
        <h3>{title}</h3>
        <Divider />

        {children}
    </dialog >
}

export default ModalDialog;
