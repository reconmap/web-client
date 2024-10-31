import { Divider } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import "./ModalDialog.css";

const ModalDialog = ({ title, children, visible, onModalClose, style = {} }) => {
    const htmlRef = useRef(null);

    const closeDialog = (ev) => {
        htmlRef.current?.close();
    };

    const isClickInsideRectangle = (ev, element) => {
        return true;
        if (ev.target.nodeName === "OPTION") return true;

        const r = element.getBoundingClientRect();

        return ev.clientX > r.left && ev.clientX < r.right && ev.clientY > r.top && ev.clientY < r.bottom;
    };

    useEffect(() => {
        htmlRef.current?.addEventListener("close", onModalClose);
        return () => htmlRef.current?.removeEventListener("close", onModalClose);
    }, [onModalClose]);

    useEffect(() => {
        if (visible) {
            htmlRef.current?.showModal();
        } else {
            htmlRef.current?.close();
        }
    }, [visible]);

    return (
        <dialog
            ref={htmlRef}
            className="html-dialog"
            onClick={(ev) => htmlRef.current && !isClickInsideRectangle(ev, htmlRef.current) && closeDialog()}
            style={style}
        >
            <h3>{title}</h3>
            <Divider />

            {children}
        </dialog>
    );
};

export default ModalDialog;
