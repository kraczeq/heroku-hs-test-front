import "./SchedulePage.css";
import SavedSchedule from "../Schedule/components/WeekSchedule/WeekSchedule";
import PageTitle from "../../components/PageTitle/PageTitle";
import Taskbar from "../../components/Taskbar/Taskbar";
import axios from "axios";

import { baseApiUrl } from "../../services/routes";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";

const SchedulePage = () => {

  function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


  const [schedules, setSchedules] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`${baseApiUrl}/schedule`).then((response) => {

      console.log("schedule: ", response.data);
      sortByKey(response.data,"id");
      setSchedules(response.data);
    });

    axios.get(`${baseApiUrl}/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const countDoctors = () => {
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].role === "Doctor") {
        counter++;
      }
    }
    return counter;
  };

  const countNurses = () => {
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].role === "Nurse") {
        counter++;
      }
    }
    return counter;
  };
  const { userState } = useContext(UserContext);
  return (
    <div>
      <PageTitle pageTitle={"SCHEDULE"} />
      <div className="ScheduleContainer">
        {schedules
          .slice(schedules.length - 9, schedules.length)
          .map((schedule, key) => {
            return (
              <SavedSchedule
                key={key}
                id={schedule.id}
                fullEndDate={schedule.fullEndDate}
                startDate={schedule.startDate}
                endDate={schedule.endDate}
                isGenerated={schedule.isGenerated}
                doctorsNumber={countDoctors()}
                nursesNumber={countNurses()}
              />
            );
          })}
      </div>
      <Taskbar initials={userState.email} />
    </div>
  );
};

export default SchedulePage;
