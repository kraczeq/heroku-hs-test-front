import "./EmptyUsers.css"
import PageTitle from "../../../../components/PageTitle/PageTitle"

const EmptyUsers = () =>
{
    return (
        <div className="EmptyUsersPage">
            <PageTitle pageTitle={"USERS"} />
            <div className="Text">Nothing here yet</div>
        </div>
    );
}

export default EmptyUsers;