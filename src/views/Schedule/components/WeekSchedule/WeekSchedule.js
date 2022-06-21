import "./WeekSchedule.css";
import Employee from "./Employee/Employee";
import doctorIcon from "../../../../icons/doctor-icon.svg";
import nurseIcon from "../../../../icons/nurse-icon.svg";

import nurseStyle from "./Employee/Styles/NurseStyle.js";
import doctorStyle from "./Employee/Styles/DoctorStyle.js";
import { useNavigate } from "react-router-dom";
const SavedSchedule = (props) => {
  const navigate = useNavigate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <div
      className={
        Date.parse(props.fullEndDate) > Date.parse(today)
          ? "SavedScheduleWrapper"
          : "SavedScheduleWrapperBeforeToday"
      }
      onClick={() => {
        navigate(`/chosenWeek/${props.id}`, { replace: true });
      }}
    >
      <div className="ScheduleDataWrapper">
        <span className="SavedScheduleDateContent">
          {" "}
          {props.startDate} - {props.endDate}
          <span className="SavedScheduleGenerationContent">
            {props.isGenerated === true ? null : "(not generated)"}
          </span>
        </span>
      </div>
      <div className="EmployeesContainer">
        <div className="EmployeesWrapper">
          <Employee
            icon={doctorIcon}
            employeesNumber={!props.doctorsNumber ? "-" : props.doctorsNumber}
            style={doctorStyle}
          />
          <Employee
            icon={nurseIcon}
            employeesNumber={!props.nursesNumber ? "-" : props.nursesNumber}
            style={nurseStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default SavedSchedule;
