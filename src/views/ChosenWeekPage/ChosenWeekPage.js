import { useParams } from "react-router-dom"
import axios from "axios";
import { baseApiUrl } from "../../services/routes";
import { useState, useEffect } from "react";
import WeekSchedulePage from "../WeekSchedulePage/WeekSchedulePage"
import EmptyWeekPage from "../EmptyWeek/EmptyWeekPage"


const ChosenWeekPage = () => {
    let { id } = useParams();
    const [schedule, setSchedule] = useState([]);
    useEffect(() =>
    {
       axios.get(`${baseApiUrl}/schedule/byId/${id}`).then((response) =>
        {
        setSchedule(response.data);
        });
    },[id])

    return (
        <div>
            {(() => {
                switch(typeof(schedule.isGenerated))
                {
                   case 'undefined': return <></>

                   case 'boolean':  return schedule.isGenerated? <WeekSchedulePage startDate={schedule.startDate} endDate={schedule.endDate} id={id}/> : <EmptyWeekPage startDate={schedule.startDate} endDate={schedule.endDate} id={id}/>
                    
                   default:
                }})()}
        </div>
    );
}

export default ChosenWeekPage;