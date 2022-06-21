import DayGrid from "../../../../../components/DayGrid/DayGrid";
import "./WeekScheduleGrids.css";
import axios from "axios";
import { baseApiUrl } from "../../../../../services/routes";
import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../contexts/UserContext";

const WeekScheduleGrids = (props) => {
  const { userState } = useContext(UserContext);
  const [mondayWorkDays, setMondayWorkDays] = useState([]);
  const [tuesdayWorkDays, setTuesdayWorkDays] = useState([]);
  const [wednesdayWorkDays, setWednesdayWorkDays] = useState([]);
  const [thursdayWorkDays, setThursdayWorkDays] = useState([]);
  const [fridayWorkDays, setFridayWorkDays] = useState([]);

  const getWorkHoursFromDay = useCallback(
    async (idSchedule, weekDay) => {
      await axios
        .get(`${baseApiUrl}/workDays/schedule/${idSchedule}/weekDay/${weekDay}`,{params:{id: userState.id}})
        .then((response) => {
          //console.log("Hours",response.data)

          switch (weekDay) {
            case 1:
              setMondayWorkDays(response.data);
              break;
            case 2:
              setTuesdayWorkDays(response.data);
              break;
            case 3:
              setWednesdayWorkDays(response.data);
              break;
            case 4:
              setThursdayWorkDays(response.data);
              break;
            case 5:
              setFridayWorkDays(response.data);
              break;
            default:
              break;
          }
        });
    },
    [userState.id]
  );
  useEffect(() => {
    getWorkHoursFromDay(props.id, 1);
    getWorkHoursFromDay(props.id, 2);
    getWorkHoursFromDay(props.id, 3);
    getWorkHoursFromDay(props.id, 4);
    getWorkHoursFromDay(props.id, 5);
  }, [props.id, getWorkHoursFromDay]);

  console.log("monday", mondayWorkDays);
  console.log("friday", fridayWorkDays);

  //Example
  //TODO map into array
  //TODO fix GridDay label margin/padding or fix DayGrid centering
  return (
    <div className="WeekScheduleGridContainer" >
    <div id="capture">
      <DayGrid employeeData={mondayWorkDays} labelText="Monday" />
      <DayGrid employeeData={tuesdayWorkDays} labelText="Tuesday" />
      <DayGrid employeeData={wednesdayWorkDays} labelText="Wednesday" />
      <DayGrid employeeData={thursdayWorkDays} labelText="Thursday" />
      <DayGrid employeeData={fridayWorkDays} labelText="Friday" />
    </div>
    </div>
  );
};

export default WeekScheduleGrids;
