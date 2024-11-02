import { ReactNode } from "react";

interface LabelledFieldProps {
    htmlFor: string;
    label: string;
    control: ReactNode;
}

const LabelledField : React.FC<LabelledFieldProps> = ({ htmlFor, label, control} ) => {
    return (
        <div className="field">
            <label className="label" htmlFor={htmlFor}>
                {label}
            </label>
            <div className="control">{control}</div>
        </div>
    );
};

export default LabelledField;
