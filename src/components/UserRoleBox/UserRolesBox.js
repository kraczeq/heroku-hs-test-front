import "./UserRolesBox.css"
import axios from "axios";
import { baseApiUrl } from "../../services/routes"
import { useState, useEffect } from "react";

const UserRolesBox = ({roleName, roleMail}) =>
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
   /* 
    const countRole = () =>{
        
        let counter=0;
        for(let i=0;i<users.length; i++){
            if(users[i].role === roleName){
                counter++;
            }
        }
        return counter;
    }*/

    if(roleName === "Doctor")
    {
        return (
            <div className="URoleBox">
                <div className="UDoctorIcon"></div>
                <div type="doctors" className="UAll">Doctor</div>
                <div className="UFree">{roleMail.substring(0, roleMail.indexOf("@"))}</div>
            </div>
        );
    }
    if(roleName === "Nurse")
    {
        return (
            <div className="URoleBox">
                <div className="UNurseIcon"></div>
                <div type="nurses" className="UAll">Nurse</div>
                <div className="UFree">{roleMail.substring(0, roleMail.indexOf("@"))}</div>
            </div>
        );
    }
}

export default UserRolesBox;