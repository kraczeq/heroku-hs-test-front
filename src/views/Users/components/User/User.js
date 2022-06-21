import "./User.css"

import calendarIcon from "../../../../icons/calendar-lines-pen2.svg"
import ProgressBar from "./ProgressBar/ProgressBar";
import JobTypeDropdown from "./JobTypeDropdown/JobTypeDropdown";
import { useNavigate} from "react-router-dom"
import userEvent from "@testing-library/user-event";
const User = ({ id, name, capacity, used, role }) =>
{
    const navigate = useNavigate();
    return (
        <div className="EmployeeWrapper">
            <span className="NameContainer">{name}</span>
            <span className="CapacityContainer">{capacity + "h"}</span>
            <span className="UsedContainer">{used + "h"}</span>
            <span className="ProgressBarContainer">
                <ProgressBar percentFilled={(used/capacity)*100} />
            </span>
            <span className="JobTypeDropdownContainer">
                <JobTypeDropdown role={role}  />
            </span>
            <img className="IconContainer" src={calendarIcon} alt="calendarIcon" onClick={() => { navigate(`/settings/${id}`, { replace: true }); }}/>
        </div>
    );
}

export default User;