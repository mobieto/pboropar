import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Users } from "../data/users";
import { ThisUser } from "../data/thisUser";
import Footer from "../components/footer";
import ProfilePic from "../assets/images/default-profile.png"
import GolfBackground from "../assets/images/golf-background.jpg";

export default function HomePage() {
    const navigate = useNavigate();
    const [sideBarVisible, setSideBarVisible] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <section className="flex flex-row bg-white dark:bg-dark-secondary-color">
            <div className={`${sideBarVisible ? "left-0" : "-left-52"} transition-[left] duration-300 flex flex-col h-screen w-52 bg-gray-200 dark:bg-dark-primary-color mt-16 fixed z-10`}>
                <button className={`${sideBarVisible ? "right-0" : "-right-8"} flex justify-center items-center transition-[right] px-0 h-6 w-6 absolute text-gray-900 dark:text-white font-bold text-3xl`} onClick={() => {
                    setSideBarVisible(prev => !prev);
                }}>{sideBarVisible ? "×" : "→"}</button>             
                <div className="flex flex-row w-[80%] ml-4 mt-4 mb-2 cursor-pointer decoration-gray-800 dark:decoration-white hover:underline" onClick={() => {
                    navigate(`/user/${ ThisUser.id }`);
                }}>
                    <img className="w-6" alt="Your Profile" src={ ProfilePic }/>
                    <span className="font-semibold text-md text-gray-900 dark:text-white truncate ml-2">{ ThisUser.username }</span>
                </div>
                <div className="w-[80%] ml-4 bg-gray-300 dark:bg-dark-hover-color h-[1px]"></div>
                <Link to="/golfclub" className="w-[80%] font-semibold text-xl ml-4 mt-8 mb-2 text-gray-900 dark:text-white cursor-pointer group transition duration-300">
                    Golf Club →
                    <span class="block max-w-0 group-hover:max-w-[68%] transition-all duration-300 h-0.5 bg-white"></span>
                </Link>
                <div className="w-[80%] ml-4 bg-gray-300 dark:bg-dark-hover-color h-[1px]"></div>
                <div className="flex flex-row flex-wrap justify-center h-96 gap-4 [&:not(:hover)]:no-scrollbar overflow-y-scroll">
                    {Users.map((user) =>
                        <Link key={user.id} to={`/user/${user.id}`}><div className="flex flex-col justify-center align-middle px-2 py-2 max-w-xs cursor-pointer rounded-lg hover:bg-gray-300 dark:hover:bg-dark-hover-color">
                                <img className="w-16" alt={`${ user.name }'s Profile`} src={ ProfilePic }/>
                                <span className="w-16 text-sm truncate text-center font-semibold text-gray-900 dark:text-white">{ user.username }</span>
                            </div>
                        </Link>
                    )}
                </div>
                <div className="w-[80%] ml-4 bg-gray-300 dark:bg-dark-hover-color h-[1px]"></div>
                <Link to="/golfparty" className="font-semibold text-xl ml-4 mt-8 mb-2 text-gray-900 dark:text-white cursor-pointer group transition duration-300"><span>
                    Golf Party →
                    <span class="block max-w-0 group-hover:max-w-[60%] transition-all duration-300 h-0.5 bg-white"></span>
                </span></Link>
                <span className="font-semibold text-xl ml-4 mt-4 mb-2 text-gray-900 dark:text-white cursor-pointer group transition duration-300">
                    Find Courses →
                    <span class="block max-w-0 group-hover:max-w-[73%] transition-all duration-300 h-0.5 bg-white"></span>
                </span>
                <span className="font-semibold text-xl ml-4 mt-4 text-gray-900 dark:text-white cursor-pointer group transition duration-300">
                    Book a Venue →
                    <span class="block max-w-0 group-hover:max-w-[77%] transition-all duration-300 h-0.5 bg-white"></span>
                </span>
                <span className="font-semibold text-md ml-4 mt-auto mb-[4.8rem] text-gray-900 dark:text-white cursor-pointer hover:underline"> Settings </span>
            </div>
            
            <div className="flex flex-col items-center w-full mt-24 z-0">
                <div className="flex flex-col mb-16 z-0">
                    <span className="text-gray-900 dark:text-white font-semibold text-xl mb-2 sm:ml-0 ml-4">Welcome back, { ThisUser.username }</span>
                    <span className="text-gray-900 dark:text-white font-light mb-4 sm:ml-0 ml-6">Here is your timeline</span>
                    <div className="md:w-full w-[90%] self-center bg-gray-300 dark:bg-dark-hover-color h-[1px] mb-12"></div>
                    <Fade cascade={true} damping={.15}>
                        <ul className="flex flex-col items-center gap-24 w-full">
                            <li className="flex flex-col">
                                <div className="flex flex-row items-end mb-2">
                                    <img className="w-8" alt="Friend's Profile" src={ ProfilePic }/>
                                    <span className="font-semibold text-lg text-gray-900 dark:text-white truncate ml-2"> Username </span>
                                </div>
                                <img className="w-[32rem] mb-2" src={GolfBackground} alt="Post by username"/>
                                <span className="text-gray-900 dark:text-white text-md">Hello, this is a post</span>
                            </li>
                            <li className="flex flex-col">
                                <div className="flex flex-row items-end mb-2">
                                    <img className="w-8" alt="Friend's Profile" src={ ProfilePic }/>
                                    <span className="font-semibold text-lg text-gray-900 dark:text-white truncate ml-2"> Username </span>
                                </div>
                                <img className="w-[32rem] mb-2" src={GolfBackground} alt="Post by username"/>
                                <span className="text-gray-900 dark:text-white text-md">Hello, this is a post</span>
                            </li>
                            <li className="flex flex-col">
                                <div className="flex flex-row items-end mb-2">
                                    <img className="w-8" alt="Friend's Profile" src={ ProfilePic }/>
                                    <span className="font-semibold text-lg text-gray-900 dark:text-white truncate ml-2"> Username </span>
                                </div>
                                <img className="w-[32rem] mb-2" src={GolfBackground} alt="Post by username"/>
                                <span className="text-gray-900 dark:text-white text-md">Hello, this is a post</span>
                            </li>
                        </ul>
                    </Fade>
                </div>
                
                <div className="absolute mr-8 right-0 w-[12rem] lg:flex hidden flex-col gap-16">
                    <div className="w-full h-[46rem] bg-gray-900 dark:bg-gray-50 p-2">
                        <span className="text-white dark:text-black">Advertisement</span>
                    </div>
                    <div className="w-full h-[46rem] bg-gray-900 dark:bg-gray-50 p-2">
                        <span className="text-white dark:text-black">Advertisement</span>
                    </div>
                </div>
                <Footer/>
            </div>
        </section>
    )
}