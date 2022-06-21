import "./RegisterForm.css"
import Button from "../../../../components/Button/Button";
import axios from "axios";

import { baseApiUrl } from "../../../../services/routes";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { emailValidator } from "./RegisterFormValidation";
import { nameValidator } from "./RegisterFormValidation";
import { surnameValidator } from "./RegisterFormValidation";
import { roleValidator } from "./RegisterFormValidation";
import { passwordValidator, confirmPasswordValidator } from "./RegisterFormValidation";

const RegisterForm = ({setFailedState}) => 
{
    const navigate = useNavigate();
    const validate = (values) => 
    {
        const errors = {};
        //nameValidator(values, errors);
        //surnameValidator(values, errors);
        emailValidator(values, errors);
        roleValidator(values, errors);
        passwordValidator(values, errors);
        confirmPasswordValidator(values, errors);
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            //name: "",
            //surname: "",
            role: "",
            password: "",
            confirmPassword: "",
        },
        validate,
        onSubmit: (values, { resetForm }) => 
        {
            resetForm({ values: "" });
            axios
                .post(`${baseApiUrl}/register`, values)
                .then((response) =>
                {
                    navigate("/login", { replace: true });
                })
                .catch((error) =>
                {
                    setFailedState({isFailed: true,message: error.response.data.error.errors[0].message});
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

            <label className="Label">Role</label>
            <div className="InputWrapper">
                <select
                    name="role" 
                    className="SelectForm" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.role}
                >
                    <option>Select role</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                </select>
                {formik.touched.role && formik.errors.role
                    ? <div className="ValidationError">{formik.errors.role}</div>
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

            <label className="Label">Confirm password</label>
            <div className="InputWrapper">
                <input
                    type="password"
                    name="confirmPassword"
                    className="InputForm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? <div className="ValidationError">{formik.errors.confirmPassword}</div>
                    : null}
            </div>
            <Button buttonContent="Create account" type="submit" />
        </form>
    );
};

export default RegisterForm;
