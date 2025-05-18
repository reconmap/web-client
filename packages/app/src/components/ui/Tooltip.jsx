import CssIcon from "./CssIcon.js";
import "./Tooltip.module.css";

const Tooltip = ({ text, position = "top" }) => {
    return (
        <span data-tooltip={text} data-tooltip-position={position}>
            <CssIcon name="question-circle" />
        </span>
    );
};

export default Tooltip;
