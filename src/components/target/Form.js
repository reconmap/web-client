import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import TargetKinds from '../../models/TargetKinds';

const TargetForm = ({ newTarget, onFormSubmit, targetSetter: setTarget }) => {
    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        let value = target.value;

        if ('tags' === name) {
            value = JSON.stringify(value.split(','));
        }

        setTarget({ ...newTarget, [name]: value });
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <input name="name" placeholder="e.g. 127.0.0.1" onChange={onFormChange} required autoFocus />
                </FormControl>
                <FormControl id="tags">
                    <FormLabel>Tags</FormLabel>
                    <input name="tags" placeholder="e.g. linux,production" onChange={onFormChange} />
                </FormControl>
                <FormControl id="kind" isRequired>
                    <FormLabel>Kind</FormLabel>
                    <Select name="kind" onChange={onFormChange}>
                        {TargetKinds.map((targetKind, index) =>
                            <option key={index} value={targetKind.value}>{targetKind.description}</option>
                        )}
                    </Select>
                </FormControl>
            </form>
        </div>
    )
}

export default TargetForm;
