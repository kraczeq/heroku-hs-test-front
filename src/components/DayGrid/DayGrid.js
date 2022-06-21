import * as d3 from 'https://unpkg.com/d3?module'
import { useEffect, useRef } from 'react';
import "./DayGrid.css"
import { UserContext } from "../../contexts/UserContext";
import { useContext } from 'react';
import axios from "axios";
import { baseApiUrl } from "../../services/routes";
import { useState,useCallback} from "react";

const DayGrid = ({ employeeData, labelText}) =>
{
  
  const { userState,setUserState } = useContext(UserContext);
  console.log("employee",employeeData);
  const [users, setUsers] = useState({});
  const svgRef = useRef(null);

  const margin = {top: 0, right: 10, bottom: 20, left: 43};
  const width = 1000;
  const height = 200;
    
    
  const gridHourSize = 13;
  const gridHourFont = "Montserrat";
  
  const numberOfLines = 24;
  const lineColor = "black";
  const lineWidth = 0.2;

  const doctorBoxColor = "#506EDF";
  const nurseBoxColor = "#37B9C6";
  let employeeBoxDefaultHeight = 25;
  const employeeBoxDefaultWidth = 37.5;
  const employeeBoxOpacity = 0.8;
  const employeeBoxBorderRadius = 10;
  const employeeNameSize = 12;
  const employeeNameColor = "white";
  const employeeNameDefaultY = 18;
  const employeeNameDefaultX = 10; 
  const employeeNameFont = "Montserrat";


  const startDate = new Date("2019-03-29 00:00:00");
  const endDate = new Date("2019-03-30 00:00:00");

  const getEmployeeBoxColor = (userState) => {
    return userState.role === "Doctor"
      ? doctorBoxColor
      : nurseBoxColor;
  }
 /* const getUsers = () => {

    axios
    .get(`${baseApiUrl}/users`)
    .then((response) => {
      //console.log("Hours",response.data.role)
      setUsers(response.data)
    });
  }


  const getEmployeeBoxColor = useCallback((email) => {
     
    const user = users.find((p) => p.email === email)
      return user.role === "Doctor"
      ? doctorBoxColor
      : nurseBoxColor;
  },[users])*/
  useEffect(() => {
    //getUsers();
    //console.log(users)
    const svgRoot = d3.select(svgRef.current);
    svgRoot.selectAll("*").remove();

    const svg = svgRoot
      .append("svg")
      .attr("width", width )
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + 0 + ")")

        
    let xScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, width - 100]);

    let xAxisGenerator = d3.axisBottom(xScale);
    xAxisGenerator.tickSize(-height);
    xAxisGenerator.ticks(numberOfLines)

    let xAxis = svg
      .append("g")
      .call(xAxisGenerator);
       
    xAxis
      .attr("transform",`translate(${0}, ${height - 35})`);

    xAxis
      .select(".domain")
      .remove();

    xAxis
      .selectAll(".tick text")
      .attr("font-size", gridHourSize)
      .attr("font", gridHourFont)
      .attr("transform", "rotate(-45)");
        
    xAxis
      .selectAll(".tick text")
      .filter((d, i, ticks) => i === 0 || i === ticks.length - 1)
      .text("12 AM");
        
    xAxis
      .selectAll(".tick line")
      .attr("stroke", lineColor)
      .attr("stroke-width", lineWidth);

     let temp = -25;
     const users = [];
     let iter = 0;
     let bool = false;
console.log(window.location.pathname === "/home")
    if(window.location.pathname === "/home") {
      employeeBoxDefaultHeight = 55;
    }
    else{
      employeeBoxDefaultHeight = 25;
    }
    
    {employeeData.map((data) => {
    if(!users.includes(data.email)){
      users.push(data.email)
      temp +=25
      bool = true;
    }
    else{
      let indeks = users.indexOf(data.email);
      temp = indeks*25;
      bool = false;
    }
    svg.append("rect")
    .attr("fill", getEmployeeBoxColor(data))
    .attr("fill-opacity", employeeBoxOpacity)
    .attr("x", employeeBoxDefaultWidth * data.workStart )
    .attr("y", temp)
    .attr("height", employeeBoxDefaultHeight)
    .attr("width", employeeBoxDefaultWidth * (data.workEnd - data.workStart)) 
    .attr("rx", employeeBoxBorderRadius);


    svg.append("text")
      .attr("font-size", employeeNameSize)
      .attr("font", employeeNameFont)
      .attr("x", data.workStart * employeeBoxDefaultWidth + employeeNameDefaultX)
      .attr("y", temp + 18)
      .attr("fill", employeeNameColor)
      .text(data.email)
      temp = iter *25;
    if(!bool){
      temp -=25;
    }
      iter++;
    })}
    }, [employeeData, margin, endDate, startDate,userState]);
  
  return (
    <div className="DayGridWrapper">
      <p className="LabelWrapper"> {labelText} </p>
      <svg className="SvgWrapper"ref={svgRef} width={width} height={height}/>
    </div>
  );
}

export default DayGrid;

