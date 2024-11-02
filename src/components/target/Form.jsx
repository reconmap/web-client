import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import TargetKinds from "../../models/TargetKinds";

const TargetForm = ({ newTarget, onFormSubmit, targetSetter: setTarget }) => {
    const onFormChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        let value = target.value;

        if ("tags" === name) {
            value = JSON.stringify(value.split(","));
        }

        setTarget({ ...newTarget, [name]: value });
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div id="name" isRequired>
                    <label>Name</label>
                    <NativeInput
                        name="name"
                        placeholder="e.g. 127.0.0.1"
                        onChange={onFormChange}
                        isRequired
                        autoFocus
                    />
                </div>
                <div id="tags">
                    <label>Tags</label>
                    <NativeInput name="tags" placeholder="e.g. linux,production" onChange={onFormChange} />
                </div>
                <div id="kind" isRequired>
                    <label>Kind</label>
                    <NativeSelect name="kind" onChange={onFormChange}>
                        {TargetKinds.map((targetKind, index) => (
                            <option key={index} value={targetKind.value}>
                                {targetKind.description}
                            </option>
                        ))}
                    </NativeSelect>
                </div>
            </form>
        </div>
    );
};

export default TargetForm;
