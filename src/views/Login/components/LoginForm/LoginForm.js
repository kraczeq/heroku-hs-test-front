import "./LoginForm.css";
import Button from "../../../../components/Button/Button";
import axios from "axios";

import { baseApiUrl } from "../../../../services/routes";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { emailValidator, passwordValidator } from "./LoginFormValidation";
import { useContext } from 'react';
import { UserContext } from "../../../../contexts/UserContext"
import "../../../../components/Notifications/Notifications.css"

const LoginForm = ({setFailedState}) =>
{
	const navigate = useNavigate();
	const { setUserState } = useContext(UserContext);
	const validate = (values) =>
	{
		const errors = {};
		emailValidator(values, errors);
		passwordValidator(values, errors);

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate,
		onSubmit: async (values, { resetForm }) =>
		{
			resetForm({ values: "" });
			await axios
				.post(`${baseApiUrl}/login`, values)
				.then((response) =>
				{
					localStorage.setItem("accessToken", response.data.accessToken);
					localStorage.setItem("refreshToken", response.data.refreshToken);
					console.log(response.data);
					navigate("/home", { replace: true });
					setUserState({ id: response.data.id, email: response.data.email, status: true, role: response.data.role });
				})
				.catch((error) =>
				{
					setFailedState({isFailed: true,message: error.response.data.error});
					console.log(error.response.data);

					if(document.querySelector('.NotificationBox').style.display === "none"){
						document.querySelector('.NotificationBox').style.display = "block";
					}
				});
		},
	});


	return (
		<form onSubmit={formik.handleSubmit} className="FormWrapper">
			<label className="Label">Email</label>
			<div className="InputWrapper">
				<input
					type="email"
					name="email"
					className="InputForm"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email
					? <div className="ValidationError">{formik.errors.email}</div>
					: null}
			</div>

			<label className="Label">Password</label>
			<div className="InputWrapper">
				<input
					type="password"
					name="password"
					className="InputForm"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>
				{formik.touched.password && formik.errors.password
					? <div className="ValidationError">{formik.errors.password}</div>
					: null}
			</div>
			<Button buttonContent="Login" type="submit" />
		</form>
	);
};

export default LoginForm;
