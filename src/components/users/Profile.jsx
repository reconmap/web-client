import { ButtonGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { resetPassword } from "api/users";
import NativeButton from "components/form/NativeButton";
import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import BooleanText from "components/ui/BooleanText";
import EmptyField from "components/ui/EmptyField";
import TimestampsSection from "components/ui/TimestampsSection";
import { actionCompletedToast } from "components/ui/toast.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import AuditLogsTable from "../auditlog/AuditLogsTable";
import UserAvatar from "../badges/UserAvatar";
import UserRoleBadge from "../badges/UserRoleBadge";
import Breadcrumb from "../ui/Breadcrumb";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import { LastLogin } from "./LastLogin";

const UserProfile = () => {
    const navigate = useNavigate();

    const { userId } = useParams();
    const [user] = useFetch(`/users/${userId}`);
    const [auditLog] = useFetch(`/users/${userId}/activity`);
    const deleteUser = useDelete("/users/");

    const onDeleteButtonClick = (ev) => {
        ev.preventDefault();

        deleteUser(userId).then(() => {
            navigate("/users");
        });
    };

    const enableMfa = () => {
        enableMfa(userId).then(() => {
            actionCompletedToast("MFA enabled");
        });
    };

    const onResetPasswordClick = () => {
        resetPassword(userId).then(() => {
            actionCompletedToast("Password reset");
        });
    };

    if (!user) return <Loading />;

    return (
        <>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
                <ButtonGroup>
                    <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                        <LinkButton href={`/users/${user.id}/edit`}>Edit</LinkButton>
                        {!user.mfa_enabled && <NativeButton onClick={enableMfa}>Enable MFA</NativeButton>}
                        <NativeButton onClick={onResetPasswordClick}>Reset password</NativeButton>
                        <DeleteButton onClick={onDeleteButtonClick} />
                    </RestrictedComponent>
                </ButtonGroup>
            </div>
            <div>
                <PageTitle value={`${user.full_name} user`} />

                <Title
                    type="User profile"
                    title={user.full_name}
                    icon={user.email ? <UserAvatar email={user.email} /> : null}
                />
                <Tabs isLazy>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Activity</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="grid grid-two">
                                <div>
                                    <h4>Properties</h4>
                                    <dl>
                                        <dt>Short bio</dt>
                                        <dd>{user.short_bio ? user.short_bio : <EmptyField />}</dd>

                                        <dt>Role</dt>
                                        <dd>
                                            <UserRoleBadge role={user.role} />
                                            <br />
                                        </dd>

                                        <dt>Timezone</dt>
                                        <dd>{user.timezone}</dd>

                                        <dt>Active?</dt>
                                        <dd>
                                            <BooleanText value={user.active} />
                                        </dd>

                                        <dt>2FA enabled?</dt>
                                        <dd>
                                            <BooleanText value={user.mfa_enabled} />
                                        </dd>
                                    </dl>
                                </div>

                                <div>
                                    <TimestampsSection entity={user} />
                                    <dl>
                                        <dt>Last login</dt>
                                        <dd>
                                            <LastLogin user={user} />
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h4>
                                Activity (<Link to="/auditlog">view full audit log</Link>)
                            </h4>
                            {auditLog ? <AuditLogsTable auditLog={auditLog} hideUserColumns="true" /> : <Loading />}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    );
};

export default UserProfile;
