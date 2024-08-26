import NativeInput from "./NativeInput";

const DynamicForm = ({ fields }) => {
    return fields.map((field) => {
        if (["text", "number"].includes(field.kind)) {
            return (
                <div>
                    <label for={field.name}>{field.label}</label>
                    <NativeInput
                        id={field.name}
                        type={field.kind}
                        name={field.name}
                    />
                </div>
            );
        }
    });
};

export default DynamicForm;
