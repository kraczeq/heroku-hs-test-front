const CapacityBar = ({ percentFilled }) =>
{
    let filledWidth = String(percentFilled).concat("%");

    const capacityBarWrapperStyle = {
        display: "inline-block",
        borderRadius: "20px",
        height: "4px",
        width: "300px",
        backgroundColor: "white",
    };

    const capacityBarStyle = {
        height: "4px",
        width: filledWidth,
        borderRadius: "10px",
        backgroundColor: "#9AAFFF",
    };

    return (
        <div style={capacityBarWrapperStyle}>
            <div style={capacityBarStyle}></div>
        </div>
    );
}

export default CapacityBar;