import { ButtonGroup } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import { IconBriefcase } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import DocumentPreview from './Preview';

const DocumentDetailsPage = () => {
    const { documentId } = useParams();
    const history = useHistory()

    const [serverDoc] = useFetch(`/documents/${documentId}`)
    const deleteDocument = useDelete(`/documents/`)

    const handleDelete = async () => {
        const confirmed = await deleteDocument(documentId);
        if (confirmed)
            history.push('/documents');
    }

    if (!serverDoc) {
        return <Loading />
    }

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/documents">Documents</Link>
            </Breadcrumb>
            <ButtonGroup>
                <EditButton onClick={(ev) => {
                    ev.preventDefault();
                    history.push(`/documents/${serverDoc.id}/edit`)
                }}>Edit</EditButton>
                <DeleteButton onClick={handleDelete} />
            </ButtonGroup>
        </div>
        <article>
            <div>
                <PageTitle value={`${serverDoc.title} document`} />
                <Title type="Document" title={serverDoc.title} icon={<IconBriefcase />} />
            </div>

            <div className="grid grid-two">
                <div>
                    <dl>
                        <dt>Visibility</dt>
                        <dd>{serverDoc.visibility}</dd>

                        <dt>Content</dt>
                        <dd>
                            <DocumentPreview content={serverDoc.content} />
                        </dd>
                    </dl>
                </div>

                <div>
                    <h4>Relations</h4>
                    <dl>
                        <dt>Created by</dt>
                        <dd><UserLink userId={serverDoc.creator_uid}>{serverDoc.creator_full_name}</UserLink></dd>
                    </dl>

                    <TimestampsSection entity={serverDoc} />
                </div>
            </div>
        </article>
    </div>
}

export default DocumentDetailsPage;
