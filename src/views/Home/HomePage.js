import "./HomePage.css"
import 'react-clock/dist/Clock.css';
import Taskbar from "../../components/Taskbar/Taskbar";
import UserRolesBox from "../../components/UserRoleBox/UserRolesBox"
import CapacityBar from "../Users/components/CapacityBar"
import Notification from "../../components/Notifications/Notifications";
import DayGridHomeContainer from "./components/DayGridHomeContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import WeekScheduleGrids from "../Schedule/components/WeekSchedule/WeekScheduleGrids/WeekScheduleGrids";
import Clock from 'react-clock';

import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../contexts/UserContext";
import userEvent from "@testing-library/user-event";

const HomePage = () => {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const { userState } = useContext(UserContext);
    const pageTitle = "DASHBOARD";

    const getWeekDay = () => {
        const day = new Date();
        return day.getDay();
    };
    console.log(userState)
    return (
        <div className="HExternalBox">
            <PageTitle pageTitle={pageTitle} />
            <div className="HUserBoxes">
                <div className="Hblock">
                    {userState.role.length === 0 ? <UserRolesBox roleName={"Doctor"} roleMail={""} /> : <UserRolesBox roleName={userState.role} roleMail={userState.email} />}
                </div>
                <div className="Hblock">
                    <div className="ClockBox">
                        <div className="CurrentTime">Current time: </div>
                        <div className="TimeBox">
                            <Clock value={value} />
                        </div>  
                    </div>
                </div>
                <div className="Hblock">
                    <div className="HCapasityBox">
                        <div className="HTotalCapacity">Total Capacity</div>
                        <div className="HHours">{getWeekDay() * 8}/40 h</div>
                        <div className="HProgressLine">
                            <CapacityBar percentFilled={getWeekDay() * 8 / 40 * 100} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="DayGridHomeWrapper">
                <DayGridHomeContainer user={userState} />
            </div>
            <Taskbar initials={userState.email} />
        </div>
    );
}


export default HomePage;