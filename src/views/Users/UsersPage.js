import "./UsersPage.css"
import RolesBox from "../../components/RoleBox/RolesBox"
import UsersPanel from "../Users/components/UsersPanel/UsersPanel"
import PageTitle from "../../components/PageTitle/PageTitle"
import Taskbar from "../../components/Taskbar/Taskbar"
import CapacityBar from "./components/CapacityBar"
import axios from "axios";
import { baseApiUrl } from "../../services/routes"
import { useState, useEffect } from "react";

import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";

const UsersPage = () =>
{
    const { userState } = useContext(UserContext);
    const [users, setUsers] = useState([])
    const [doctors, setDoctors] = useState([])
    const [nurses, setNurses] = useState([])
    const [userPanelViewMode, setUserPanelViewMode] = useState("All");
    useEffect(() =>
    {
        axios.get(`${baseApiUrl}/users`).then((response) =>
        {
            setUsers(response.data);
        });
        axios.get(`${baseApiUrl}/users/doctors`).then((response) =>
        {
            setDoctors(response.data);
        });
        axios.get(`${baseApiUrl}/users/nurses`).then((response) =>
        {
            setNurses(response.data);
        });
    },[])
    
    const countTotalCapacity = () =>{
        return users.length*40;
    }

    const getWeekDay = () => {
        const day = new Date();
        return day.getDay();
    };

    return (
        <div className="ExternalBox">
            <PageTitle pageTitle={"USERS"} />
            <div className="UserBoxes">
                <div className="block">
                    <RolesBox roleName={"Doctor"} setUserPanelViewMode = {setUserPanelViewMode} />
                </div>
                <div className="block">
                    <RolesBox roleName={"Nurse" } setUserPanelViewMode = {setUserPanelViewMode} />
                </div>
                <div className="block">
                    <div className="CapasityBox">
                        <div className="TotalCapacity">Total Capacity</div>
                        <div className="Hours">{(countTotalCapacity()/40)*getWeekDay()*8}/{countTotalCapacity()}h</div>
                        <div className="ProgressLine">
                            <CapacityBar percentFilled={((countTotalCapacity()/40)*getWeekDay()*8/countTotalCapacity())*100}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="UsersPanelBox">
            {(() => {
                 console.log(userPanelViewMode);
                switch(userPanelViewMode)
                {
                   case "All": return <UsersPanel users={users}/>

                   case "Doctor":  return <UsersPanel users={doctors}/>

                   case "Nurse": return <UsersPanel users={nurses}/>

                   default:
                }})()}
            </div>
            <Taskbar initials={userState.email} />
        </div>
    );
}

export default UsersPage;