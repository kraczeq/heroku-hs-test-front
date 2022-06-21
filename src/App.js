import { baseApiUrl } from "./services/routes";
import ScheduledPage from "./views/Schedule/SchedulePage"
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import UsersPage from "./views/Users/UsersPage";
import HomePage from "./views/Home/HomePage";
import SettingsPage from "./views/Settings/SettingsPage";
import EmptyWeekPage from "./views/EmptyWeek/EmptyWeekPage";
import axiosInstance from "./services/axiosInstance";
import ChosenWeekPage from "./views/ChosenWeekPage/ChosenWeekPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";

function App() {
    const [userState, setUserState] = useState({
        id: 0,
        email: "",
        status: false,
        role: "",
    });
    //checking if user is auth after reloading page
    useEffect(() => {
        axiosInstance
            .get(`${baseApiUrl}/auth`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                    refreshToken: localStorage.getItem("refreshToken"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setUserState({ status: false });
                } else {
                    setUserState({
                        id: response.data.id,
                        email: response.data.email,
                        status: true,
                        role: response.data.role,
                    });
                }
            });
    }, []);

    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/schedule" element={<ScheduledPage />} />
                    <Route path="/settings/:id" element={<SettingsPage />} />
                    <Route path="/emptyWeek" element={<EmptyWeekPage />} />
                    <Route path="/chosenWeek/:id" element={<ChosenWeekPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
