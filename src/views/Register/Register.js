import AuthForm from "../../components/AuthForm/AuthForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { baseWebUrl } from "../../services/routes";
import {useState} from "react";
import Notification from "../../components/Notifications/Notifications";
const Register = () =>
{
    const linkMessage = "Login";
    const linkSource = `${baseWebUrl}/login`;
    const [failedState, setFailedState] = useState({isFailed: false, message:''});
    const form = <RegisterForm setFailedState={setFailedState}/>
    return (
        <div>
            <AuthForm linkMessage={linkMessage}
                linkSource={linkSource}
                form={form}
            />
            {failedState.isFailed
                ? <Notification AlertName={"Error"} AlertText={failedState.message} /> 
                : null
            }
        </div>
    );
}

export default Register;