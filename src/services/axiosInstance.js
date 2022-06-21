import { baseApiUrl } from "./routes";
import axios from "axios";
import jwt_decode from "jwt-decode";



const refreshToken = async () =>
{
	await axios
		.post(
			`${baseApiUrl}/refreshToken`,
			{},
			{
				headers: {
					refreshToken: localStorage.getItem("refreshToken"),
				},
			}
		)
		.then((response) =>
		{
			localStorage.setItem("accessToken", response.data.accessToken);
			return response.data.accessToken;
		})
		.catch((error) =>
		{	
			if(window.location.pathname !== "/login" && window.location.pathname !== "/"  ){
				window.location.href = "/login";
			}
			console.log(error.response.data);
		});
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
	async (config) =>
	{
		let currentDate = new Date();
		const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
		if (decodedToken.exp * 1000 < currentDate.getTime())
		{
			const accessToken = await refreshToken();
			config.headers["accessToken"] = accessToken;
		}
		return config;
	},
	(error) =>
	{
		return Promise.reject(error);
	}
);

export default axiosInstance;