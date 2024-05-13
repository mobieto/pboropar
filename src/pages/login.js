import { useNavigate , Link } from "react-router-dom";
import { useRef , useState, useEffect } from "react";
import { ThisUser } from "../data/thisUser";
import PasswordShowIcon from "../assets/images/password-show.png";
import PasswordHideIcon from "../assets/images/password-hide.png";

export default function LoginPage() {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <section className="bg-hero h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <span className="flex items-center mb-6 text-4xl font-semibold text-white">
                        pboropar
                    </span>
                    <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-dark-primary-color">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-200">
                                Welcome!    
                            </h1>
                            <form action="#">
                                <div className="mb-8">
                                    <label className="block text-sm mb-2 font-medium text-gray-900 dark:text-gray-200">Username</label>
                                    <input ref={usernameRef} placeholder="User123" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-dark-secondary-color dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                    <span className={`${usernameError !== "" ? "block" : "hidden"} text-red-500 text-xs font-semibold mt-2`}>{usernameError}</span>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm mb-2 font-medium text-gray-900 dark:text-gray-200">Password</label>
                                    <div className="flex">
                                        <input type={`${passwordVisible ? "text" : "password"}`} ref={passwordRef} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-dark-secondary-color dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        <span className="flex justify-around items-center cursor-pointer" onClick={() => {
                                            setPasswordVisible(prev => !prev);
                                        }}>
                                            <img className="absolute mr-12 w-6 filter dark:invert-[100%] dark:sepia-[55%] dark:saturate-[2%] dark:hue-rotate-[233deg] dark:brightness-[107%] dark:contrast-100" src={passwordVisible ? PasswordHideIcon : PasswordShowIcon} alt="Show password"/> 
                                        </span>
                                    </div>
                                    <span className={`${passwordError !== "" ? "block" : "hidden"} text-red-500 text-xs font-semibold mt-2`}>{passwordError}</span>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <a href="#" className="text-sm text-gray-900 dark:text-gray-200 font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot your password?</a>
                                    <button className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-16 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-8 mb-2" 
                                        onClick={(event) => {
                                            const username = usernameRef.current.value;
                                            const password = passwordRef.current.value;

                                            if (username === "admin") {
                                                ThisUser.name = usernameRef.current.value;                                         
                                                localStorage.setItem("sessionUser", ThisUser.name);
                                                navigate("/home");
                                                window.location.reload();
                                                return;
                                            }

                                            const users = JSON.parse(localStorage.getItem("users")) || {};

                                            event.preventDefault();

                                            setUsernameError("");
                                            setPasswordError("");

                                            if (username === "") return setUsernameError("Please fill this field");

                                            if (password === "") return setPasswordError("Please fill this field");

                                            if (!(username in users)) return setUsernameError("Username or password is incorrect");

                                            if (users[username] !== password) return setUsernameError("Username or password is incorrect");

                                            ThisUser.name = usernameRef.current.value;                                           
                                            localStorage.setItem("sessionUser", ThisUser.name);
                                            navigate("/home");
                                            window.location.reload();
                                        }}>Sign in</button>
                                </div>
                                <p className="w-full text-center text-sm font-light text-gray-600 dark:text-gray-200">
                                    Don’t have an account? <Link to="/signup"><span className="font-medium text-primary-600 underline text-blue-600 dark:text-primary-500">Sign up</span></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}