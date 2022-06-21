import DayGrid from "../../../components/DayGrid/DayGrid";
import "./DayGridHomeContainer.css";
import axios from "axios";
import { baseApiUrl } from "../../../services/routes";
import { useState, useEffect } from "react";

const DayGridHomeContainer = ({ user }) => {
  const getWeekDay = () => {
    const day = new Date();
    return day.getDay();
  };


  const [todayWorkDays, setTodayWorkDays] = useState([]);
  const [tomorrowWorkDays, setTomorrowWorkDays] = useState([]);
  console.log(user);
  useEffect(() => {
    axios
      .get(
        `${baseApiUrl}/workDays/home/weekDay/${getWeekDay()}/user/${user.email}`
      )
      .then((response) => {
        setTodayWorkDays(response.data);
        console.log("Today",response.data);
      });

    axios
      .get(
        `${baseApiUrl}/workDays/home/weekDay/${getWeekDay() + 1}/user/${
          user.email
        }`
      )
      .then((response) => {
        setTomorrowWorkDays(response.data);
      });
  }, [user.email]);

  //getCurrentDay()

  const todayLabel = "today";
  const tomorrowLabel = "tomorrow";

  const employeeNull = [
    {
      day: 0,
      email: "",
      id: 0,
      idSchedule: 0,
      role: "",
      workStart: 0,
      workEnd: 0,
    },
  ];
  return (
    <div className="DayGridHomeContainer">
      {todayWorkDays.length !== 0 || tomorrowWorkDays.length !== 0 ? (
        (() => {
          switch (getWeekDay()) {
            case '0':
              return (
                <div>
                  <DayGrid
                    employeeData={employeeNull}
                    labelText={todayLabel}
                    user={user}
                  />
                  <DayGrid
                    employeeData={tomorrowWorkDays}
                    labelText={tomorrowLabel}
                    user={user}
                  />
                </div>
              );

            case '5':
              return (
                <div>
                  <DayGrid
                    employeeData={todayWorkDays}
                    labelText={todayLabel}
                    user={user}
                  />
                  <DayGrid
                    employeeData={employeeNull}
                    labelText={tomorrowLabel}
                    user={user}
                  />
                </div>
              );
            default:
              return (
                <div>
                  <DayGrid
                    employeeData={todayWorkDays}
                    labelText={todayLabel}
                    user={user}
                  />
                  <DayGrid
                    employeeData={tomorrowWorkDays}
                    labelText={tomorrowLabel}
                    user={user}
                  />
                </div>
              );
          }
        })()
      ) : (
        <div>
          <DayGrid
            employeeData={employeeNull}
            labelText={todayLabel}
            user={user}
          />
          <DayGrid
            employeeData={employeeNull}
            labelText={tomorrowLabel}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default DayGridHomeContainer;
