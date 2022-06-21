import "./Notifications.css"

const Notifications = ({ AlertName, AlertText }) =>
{
    const handleNotificationOnClick = () => {
        let notification = document.querySelector('.NotificationBox')
        notification.style.display = "none"
    }
    return (
        <div className="NotificationBox">
            <div className="AlertBox" type={AlertName}></div>
            <div className="TextBox">
                <p>{AlertName}</p>
                <p>{AlertText}</p>
            </div>
            <button className="CloseButton" onClick={handleNotificationOnClick}></button>
        </div>
    );
}

export default Notifications;