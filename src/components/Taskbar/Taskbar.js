import { baseApiUrl } from "../../services/routes";
import { baseWebUrl } from "../../services/routes";

import "./Taskbar.css";
import "./TaskbarIcon/TaskbarIcon.css";
import TaskbarIcon from "./TaskbarIcon/TaskbarIcon";

import house from "../../icons/house.svg";
import users from "../../icons/users.svg";
import calendar from "../../icons/calendar.svg";
import calendarLinesPen from "../../icons/calendar-lines-pen.svg";
import circleH from "../../icons/circle-h.svg";

import ReactTooltip from "react-tooltip";
import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";

import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { useContext } from 'react';



const Taskbar = ({ initials }) =>
{
    const getFirstTwoLetter = (initials) =>
    {
        return initials?.substring(0, 2);
    }
    const { userState,setUserState } = useContext(UserContext);
    const names = ["Home", "Users", "Schedule", "My settings"];
    const navigate = useNavigate();
    const icons = [
        {
            id: 1,
            icon: house,
        },
        {
            id: 2,
            icon: users,
        },
        {
            id: 3,
            icon: calendar,
        },
        {
            id: 4,
            icon: calendarLinesPen,
        },
    ];

    const taskbarIcons = icons.map(icon => <TaskbarIcon key={icon.id} icon={icon.icon} />);

    const logout = () =>
    {
        axios
            .delete(`${baseApiUrl}/logout`, {
                headers: {
                    refreshToken: localStorage.getItem("refreshToken"),
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) =>
            {
                if (response.status === 200)
                {
                    navigate("/login", { replace: true });
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                    console.log(response);
                    setUserState({id:0, email: "", status: false, role: "" })
                }
            }
            );
    };
    const LightTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0,0,0,0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 16,
            width: 133,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontfamily: 'Montserrat',


        },
    }))(Tooltip);

    //To avoid warning
    const myPropperProps = {
        modifiers: {
            offset: {
                enabled: true,
                offset: '0px,9px'

            }
        }
    };

    return (
        <div className="TaskbarExterior">
            <div className="TaskbarLogoWrapper">
                <img src={circleH} className="TaskbarLogo" alt=""></img>
            </div>
            <div className="IconsWrapper">
                <div className={window.location.pathname === "/home" ? "TaskbarIconWrapperClicked" : "TaskbarIconWrapper"} data-tip data-for="iconTip" >
                    <a href={`${baseWebUrl}/home`}>
                        {taskbarIcons[0]}
                    </a>
                    <ReactTooltip id="iconTip" place="right" effect="solid" offset={{ right: 15 }} >
                        <span className="tooltipText">{names[0]}</span>
                    </ReactTooltip>
                </div>
                <div className={window.location.pathname === "/users" ? "TaskbarIconWrapperClicked" : "TaskbarIconWrapper"} data-tip data-for="iconTip2" >

                    <a href={`${baseWebUrl}/users`}>
                        {taskbarIcons[1]}
                    </a>
                    <ReactTooltip id="iconTip2" place="right" effect="solid" offset={{ right: 15 }} >
                        <span className="tooltipText">{names[1]}</span>
                    </ReactTooltip>
                </div>
                <div className={window.location.pathname === "/schedule" ? "TaskbarIconWrapperClicked" : "TaskbarIconWrapper"} data-tip data-for="iconTip3">
                    <a href={`${baseWebUrl}/schedule`}>
                        {taskbarIcons[2]}
                    </a>
                    <ReactTooltip id="iconTip3" place="right" effect="solid" offset={{ right: 15 }} >
                        <span className="tooltipText">{names[2]}</span>
                    </ReactTooltip>
                </div>
                <div className={window.location.pathname === `/settings/${userState.id}` ? "TaskbarIconWrapperClicked" : "TaskbarIconWrapper"} data-tip data-for="iconTip4">
                    <a href={`${baseWebUrl}/settings/${userState.id}`}>
                        {taskbarIcons[3]}
                    </a>
                    <ReactTooltip id="iconTip4" place="right" effect="solid" offset={{ right: 15 }} className="tooltip" >
                        <span className="tooltipText">{names[3]}</span>
                    </ReactTooltip>
                </div>
            </div>
            <LightTooltip title="Logout" placement="right"
                PopperProps={myPropperProps} >
                <div className="InitialsWrapper" id="logout" onClick={logout}  >
                    <p className="Initials"> {getFirstTwoLetter(initials)}</p>
                </div>
            </LightTooltip>
        </div>
    );
}

export default Taskbar;