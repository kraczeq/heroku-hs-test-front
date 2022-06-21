import { baseWebUrl } from "../../services/routes";
import AuthForm from "../../components/AuthForm/AuthForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Notification from "../../components/Notifications/Notifications";
import {useState} from "react"

const Login = () =>
{
    const linkMessage = "Create new account";
    const linkSource = `${baseWebUrl}/`;
    const [failedState, setFailedState] = useState({isFailed: false, message:''});
    const form = <LoginForm setFailedState={setFailedState} />
   
    return (
        <div>
            <AuthForm
                linkMessage={linkMessage}
                linkSource={linkSource}
                form={form}
            />
            {failedState.isFailed===true?
            <Notification AlertName={"Error"} AlertText={failedState.message} /> : null
            }
        </div>
    );
}

export default Login;