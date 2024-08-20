import RelativeDateFormatter from "components/ui/RelativeDateFormatter";

export const LastLogin = ({ user }) => {
    return (
        <>
            {user.last_login_ts ? (
                <RelativeDateFormatter date={user.last_login_ts} />
            ) : (
                "Never"
            )}
        </>
    );
};
