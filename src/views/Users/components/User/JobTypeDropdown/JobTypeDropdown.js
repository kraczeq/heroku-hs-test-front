import "./JobTypeDropdown.css"

const JobTypeDropdown = ({ role }) =>
{

    return (
        <div className="JobTypeDropdownWrapper">
            <div className="SelectionWrapper">
                {role}
            </div>
        </div>
    );
}

export default JobTypeDropdown;