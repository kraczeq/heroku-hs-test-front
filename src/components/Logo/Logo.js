import "./Logo.css"
import logo from "../../icons/logo.svg"


const Logo = () =>
{
	return (
		<div className="LogoWrapper">
			<img src={logo} alt="Hospital schedule logo" />
		</div>
	);
}

export default Logo;