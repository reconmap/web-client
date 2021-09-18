import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import PageTitle from 'components/logic/PageTitle';
import Breadcrumb from 'components/ui/Breadcrumb';
import CreateButton from 'components/ui/buttons/Create';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import EmptyField from 'components/ui/EmptyField';
import { IconDocumentDuplicate } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import NoResults from 'components/ui/NoResults';
import Title from 'components/ui/Title';
import { resolveMime } from 'friendly-mimes';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import secureApiFetch from 'services/api';

const ReportTemplatesList = ({ history }) => {
    const [templates, updateTemplates] = useFetch('/reports/templates')

    const fileRef = useRef();

    const [reportTemplate, setReportTemplate] = useState({
        version_name: "",
        version_description: null,
        resultFile: null,
    })

    const destroy = useDelete('/reports/', updateTemplates);

    const deleteTemplate = (ev, templateId) => {
        ev.stopPropagation();

        destroy(templateId);
    }

    const onAddVulnerabilityTemplateClick = () => {
        history.push(`/reports/templates/create?isTemplate=true`)
    }

    const onCreateReportFormSubmit = ev => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('version_name', reportTemplate.version_name);
        formData.append('version_description', reportTemplate.version_description);
        formData.append('resultFile', fileRef.current.files[0]);

        secureApiFetch(`/reports/templates`, {
            method: 'POST',
            body: formData
        })
            .then(resp => resp.json())
            .then(json => {
                updateTemplates();
            })
            .catch(err => console.error(err))
    }

    const onFormChange = ev => {
        setReportTemplate({ ...reportTemplate, [ev.target.name]: ev.target.value })
    }
    const safeResolveMime = mimeType => {
        try {
            return resolveMime(mimeType)['name']
        } catch (err) {
            console.error(err);
            return mimeType;
        }
    }
    return (
        <>
            <form onSubmit={onCreateReportFormSubmit}>
                <FormControl isRequired>
                    <FormLabel>Version name</FormLabel>
                    <Input type="text" name="version_name" onChange={onFormChange} autoFocus />
                </FormControl>
                <FormControl>
                    <FormLabel>Version description</FormLabel>
                    <Input type="text" name="version_description" onChange={onFormChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>File</FormLabel>
                    <Input type="file" ref={fileRef} name="resultFile" onChange={onFormChange} />
                </FormControl>
                <Button type="submit">Create</Button>
            </form>

            <PageTitle value="Report templates" />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/reports">Reports</Link>
                </Breadcrumb>

                <CreateButton onClick={onAddVulnerabilityTemplateClick}>Add report template</CreateButton>
            </div>
            <Title title='Report templates' icon={<IconDocumentDuplicate />} />
            {!templates ? <Loading /> :
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th style={{ width: '190px' }}>Name</Th>
                            <Th>Description</Th>
                            <Th style={{ width: '190px' }}>File name</Th>
                            <Th>Mime type</Th>
                            <Th>&nbsp;</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {templates.length === 0 ?
                            <Tr><Td colSpan="3"><NoResults /></Td></Tr>
                            :
                            templates.map((template) =>
                                <Tr key={template.id}>
                                    <Td>{template.version_name}</Td>
                                    <Td><EmptyField value={template.version_description} /></Td>
                                    <Td>{template.client_file_name}</Td>
                                    <Td><span title={safeResolveMime(template.file_mimetype)}>{template.file_mimetype}</span></Td>
                                    <Td justify="end">
                                        <Flex justify="end">
                                            <DeleteIconButton disabled={template.generated_by_uid === 0} title={template.generated_by_uid === 0 ? "System templates cannot be deleted" : ""} onClick={ev => deleteTemplate(ev, template.id)} />
                                        </Flex>
                                    </Td>
                                </Tr>
                            )
                        }
                    </Tbody>
                </Table>
            }
        </>
    )
}

export default ReportTemplatesList;
