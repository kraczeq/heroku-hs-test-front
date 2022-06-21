import Taskbar from "../../components/Taskbar/Taskbar";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom"
import arrow from "../../icons/left-arrow.svg";
import axios from "axios";
import { baseApiUrl } from "../../services/routes"
import WeekScheduleGrids from "../Schedule/components/WeekSchedule/WeekScheduleGrids/WeekScheduleGrids"
const WeekSchedulePage = (props) =>
{
    const navigate = useNavigate();
    const { userState } = useContext(UserContext);

    const exportPdf = async () => {
        await html2canvas(document.querySelector("#capture")).then(canvas => {
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4', false);
            pdf.addImage(imgData, 'PNG',0, 0, -140, 0, undefined, false);
            pdf.save("Schedule.pdf"); 
       });
    }
    //<div id="capture"> to choose from which div the screenshot will be taken
    //in Button add clickEffect={exportPdf} to make a download onClick
    //delete comments after changes are done
    const reGenerate = () =>{
        axios.post(`${baseApiUrl}/workDays/reGenerate/${props.id}`);   
        window.location.reload();
    }

    return (
        <div>
            <PageTitle pageTitle={props.startDate + " - " + props.endDate} />
            <div className="GoBackBox" onClick={() => { navigate('/schedule', { replace: true }); }}>
                <img src={arrow} alt="Left arrow" />
                <div className="GoBack">go back</div>
            </div>
            <div className="ButtonsBox">
                <Button buttonContent="Re-generate" type="submit"  clickEffect={reGenerate}/>
                <Button buttonContent="Download PDF" type="submit" clickEffect={exportPdf} />
            </div>
            <div className="WeekScheduleGridsWrapper">
                <div>
                <WeekScheduleGrids id ={props.id}/>
                </div>
            </div>
            
                <Taskbar initials={userState.email} />

        </div>
    );
}

export default WeekSchedulePage;