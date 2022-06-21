import "./Employee.css"

const Employee = ({ icon, employeesNumber, style }) =>
{
    return (
        <div className="EmployeesWrapper">
            <span className="EmployeesType">
                <img className="ImageWrapper" src={icon} alt="icon" />
                <span style={style}>{employeesNumber}</span>
            </span>
        </div>
    );
}

export default Employee;