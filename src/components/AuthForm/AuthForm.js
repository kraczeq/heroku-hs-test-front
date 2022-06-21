import "./AuthForm.css";
import Logo from "../Logo/Logo";


const AuthForm = ({ form, linkSource, linkMessage }) =>
{
	return (
		<div className="AuthFormBox">
			<Logo />
			<div className="BorderBox" >
				{form}
				<div className="SeparatorBox">
					<p className="Separator">
						<span className="Line"> or </span>
					</p>
				</div>
				<div className="LinkBox">
					<a href={linkSource} className="Link">
						{linkMessage}
					</a>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
