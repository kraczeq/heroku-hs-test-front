import "./SettingsPage.css";
import "./components/SettingBoxes.css";
import Taskbar from "../../components/Taskbar/Taskbar";
import PageTitle from "../../components/PageTitle/PageTitle"
import Notification from "../../components/Notifications/Notifications";
import SettingBoxes from "./components/SettingBoxes";
import React, { useRef, useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { baseApiUrl } from "../../services/routes";
import { useParams } from "react-router-dom"

const SettingsPage = () =>
{
    const { userState } = useContext(UserContext);
    const [list, setList] = useState([]);
    const [settingsValues, setSettingsValues] = useState({})
    let {id} = useParams();
    useEffect(() =>
    {
        axios.get(`${baseApiUrl}/settingsPositions/byId/${id}`).then((response) =>
        {
            setList(response.data);
        });
        axios.get(`${baseApiUrl}/settingsValues/byId/${id}`).then((response) =>
        {
            setSettingsValues(response.data);
            console.log(settingsValues);
        });
    },[])
    console.log(settingsValues);
    useEffect(() => {
        if(id == userState.id){
            window.addEventListener('beforeunload', sendLastChange)
            return () => {
                window.removeEventListener('beforeunload', sendLastChange)
            }
        }
    })
    const sendLastChange = ()=> {
        settingsValues.noNightShifts = (list[1].items.includes("nightShifts")? true : false);
        settingsValues.noDayShifts = (list[1].items.includes("dayShifts")? true : false);
        settingsValues.sameSchedule = (list[1].items.includes("sameSchedule")? true : false);
        axios.post(`${baseApiUrl}/settingsPositions/update`,{list: list, email: userState.email})
        .catch((error) =>
        {
            console.log(error.response.data);
        });
        axios.post(`${baseApiUrl}/settingsValues/update`,{settingsValues:settingsValues})
        .catch((error) =>
        {
            console.log(error.response.data);
        });
        
    }
    const [dragging, setDragging] = useState(false);


    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {

        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current){
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                dragItem.current = params
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }
    
    return (
        <div>
            <PageTitle pageTitle={"MY SETTINGS"} /> 
            <div className="SettingsExternalBox">
                <div className="ColumnBox">
                    {list.map((grp, grpI) => (
                        <div key={grp.name} className={grp.name} type={grp.name} onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e,{grpI, itemI: 0}):null}>
                            <div className="MainText">{grp.title}</div>
                            <div className="Conditions">{grp.items.length}{" conditions"}</div>
                            {grp.items.map((item, itemI) => (
                                <div className="draggable" draggable 
                                onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}} 
                                onDragEnter={(e) => {handleDragEnter(e, {grpI, itemI})}}
                                key={item} >
                                    <SettingBoxes name={item} settingsValues={settingsValues}/>
                                </div>
                            ))}   
                        </div>
                    ))}
                </div>
            </div>
            <Taskbar initials={userState.email} />
        </div>
    );
}

export default SettingsPage;