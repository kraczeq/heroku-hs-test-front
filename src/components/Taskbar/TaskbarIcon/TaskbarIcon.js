import "./TaskbarIcon.css"

const TaskbarIcon = ({ icon, id }) =>
{
    return (
        <div className="TaskbarIconWrapper" >
            <img src={icon} alt="taskbarIcon"
                id={id}
                className="Icon" >
            </img>
        </div>
    );
}

export default TaskbarIcon;