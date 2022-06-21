import "./RolesBox.css"
import axios from "axios";
import { baseApiUrl } from "../../services/routes"
import { useState, useEffect } from "react";

const RolesBox = ({ roleName, setUserPanelViewMode }) =>
{
    console.log(roleName)
    const [users, setUsers] = useState([])
    useEffect(() =>
    {
        axios.get(`${baseApiUrl}/users`).then((response) =>
        {
            setUsers(response.data);
        });
    },[])
    
    const countRole = () =>{
        
        let counter=0;
        for(let i=0;i<users.length; i++){
            if(users[i].role === roleName){
                counter++;
            }
        }
        return counter;
    }

    if(roleName === "Doctor")
    {
        return (
            <div className="RoleBox">
                <div className="DoctorIcon"></div>
                <div type="doctors" className="All">{countRole()} doctors</div>
                <div className="Free">{countRole()} free</div>
                <div className="ShowAll"  onClick={() => {setUserPanelViewMode(roleName)}}>Show all doctors</div>
            </div>
        );
    }
    if(roleName === "Nurse")
    {
        return (
            <div className="RoleBox">
                <div className="NurseIcon"></div>
                <div type="nurses" className="All">{countRole()}  nurses</div>
                <div className="Free">{countRole()} free</div>
                <div className="ShowAll"  onClick={() => {setUserPanelViewMode(roleName)}}>Show all nurses</div>
            </div>
        );
    }
}

export default RolesBox;