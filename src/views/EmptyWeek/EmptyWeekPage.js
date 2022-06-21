import "./EmptyWeekPage.css"
import PageTitle from "../../components/PageTitle/PageTitle"
import Taskbar from "../../components/Taskbar/Taskbar"
import Button from "../../components/Button/Button"
import arrow from "../../icons/left-arrow.svg"

import { useNavigate} from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { baseApiUrl } from "../../services/routes"
import { useState } from "react";

const EmptyWeekPage = (props) => {
    
    const navigate = useNavigate()
    const { userState } = useContext(UserContext);

    const onClickHandle = () => {
        axios.get(`${baseApiUrl}/workDays/generate/${props.id}`).then((response) =>
        {
            
        });   

        axios.post(`${baseApiUrl}/schedule/update/${props.id}`)
        .catch((error) =>
        {
            console.log(error.response.data);
        });
            window.location.reload();
    }


    return (
        <div>
            <PageTitle pageTitle={props.startDate + " - " + props.endDate} />
            <div id="capture">
            <div className="GoBackBox" onClick={() => { navigate('/schedule', { replace: true }); }}>
                <img src={arrow} alt="Left arrow" />
                <div className="GoBack">go back</div>
            </div>
            </div>
            <div className="EmptyPanelBox">
                <div className="EmptyWeekText">
                    Nothing here yet
                    <Button buttonContent="Generate schedule" clickEffect={onClickHandle}/>
                </div>
            </div>
            <Taskbar initials={userState.email} />
        </div>
    );
}

export default EmptyWeekPage;