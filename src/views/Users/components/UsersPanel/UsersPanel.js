import "./UsersPanel.css";
import User from "../User/User";
import axios from "axios";
import { baseApiUrl } from "../../../../services/routes";
import { useState, useEffect } from "react";

const UsersPanel = ({ users }) => {

  const getWeekDay = () => {
    const day = new Date();
    return day.getDay();
  };

  return (
    <div className="UsersPanelWrapper">
      <div className="HeaderWrapper">
        <div className="NameText"> Name </div>
        <div className="CapacityText"> Capacity </div>
        <div className="UsedText"> Used </div>
        <div className="TypeText"> Type </div>
      </div>
      {users.map((user, key) => {
        return (
          <User
            key={key}
            id={user.id}
            name={user.email.substring(0, user.email.indexOf("@"))}
            role={user.role}
            capacity={40}
            used={getWeekDay()*8}
          />
        );
      })}
    </div>
  );
};

export default UsersPanel;
