const ProgressBar = ({ percentFilled }) =>
{
    let filledWidth = String(percentFilled).concat("%");

    const progressBarWrapperStyle = {
        display: "inline-block",
        borderRadius: "10px",
        height: "4px",
        width: "300px",
        backgroundColor: "#E4E7EF",
    };

    const progressBarStyle = {
        height: "4px",
        width: filledWidth,
        borderRadius: "10px",
        backgroundColor: "#9AAFFF",
    };

    return (
        <div style={progressBarWrapperStyle}>
            <div style={progressBarStyle}></div>
        </div>
    );
}

export default ProgressBar;