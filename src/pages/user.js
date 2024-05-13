import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { Users } from '../data/users';
import { ThisUser } from '../data/thisUser';
import Footer from '../components/footer';
import ProfilePic from "../assets/images/default-profile.png";

export default function UserPage() {
    const { userId } = useParams();
    const aboutRef = useRef(null);
    const [ isTruncated, setIsTruncated ] = useState(false);
    const [ isShowingMore, setIsShowingMore ] = useState(false);

    const isUserSelf = Number(userId) === ThisUser.id;
    const user = isUserSelf ? ThisUser : Users.filter(_user => _user.id === Number(userId))[0];

    const [isInvited, setIsInvited] = useState(user.invited);

    useEffect(() => {
        function onResize() {
            const { offsetHeight, scrollHeight } = aboutRef.current || {};
            let truncated = offsetHeight && scrollHeight && offsetHeight < scrollHeight;

            truncated = truncated === 0 ? true : truncated;

            setIsTruncated(truncated);

            if (offsetHeight / 18 < 4 && isShowingMore) {
                setIsShowingMore(false);
            }
        }

        window.addEventListener("resize", onResize);

        onResize();

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [isShowingMore])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <section className="flex flex-row bg-white dark:bg-dark-secondary-color">
            <div className="flex flex-col justify-center items-center w-full mt-24">
                <div className="flex flex-row">
                    <img className="w-32 h-32" src={ProfilePic} alt="Your Profile"/>
                    <div className="flex flex-col sm:gap-y-2 gap-y-4 ml-8">
                        <div className="flex flex-row flex-wrap max-w-52 sm:max-w-full gap-x-8 gap-y-2">
                            <span className="truncate font-bold text-2xl text-gray-900 dark:text-white">{ user.username }</span>
                            <div className={`${isUserSelf ? "hidden" : "flex"} flex-row md:gap-4 gap-2`}>
                                <button className="w-24 py-1 ml-0 md:ml-32 bg-white dark:bg-dark-secondary-color rounded-md text-red-500 border-red-500 border-2 font-semibold">Unfriend</button>
                                <button className="w-24 py-1 bg-red-500 rounded-md text-white font-semibold">Block</button>
                            </div>
                            <button className={`${isUserSelf ? "blox" : "hidden"} w-24 py-1 ml-0 md:ml-32 text-white bg-blue-800 hover:bg-blue-900 rounded-md font-semibold`}>Edit Profile</button>
                        </div>                      
                        <ul className="flex flex-row gap-2 text-gray-900 dark:text-white">
                            <li>Instagram</li>
                            <li>Twitter</li>
                            <li>Facebook</li>
                        </ul>
                        <ul className="flex flex-row flex-wrap max-w-52 sm:max-w-full mt-auto gap-2 text-gray-900 dark:text-white font-light text-sm">
                            <li>52 Friends</li>
                            <li>●</li>
                            <li>83 Courses Visited</li>
                            <li>●</li>
                            <li>12 Hole In Ones</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-[80%] mt-8 bg-gray-200 dark:bg-dark-hover-color p-4">
                    <span className="text-gray-900 dark:text-white font-semibold text-xl">About me</span>
                    <div>
                        <span className={`${!isShowingMore && "line-clamp-3"} text-gray-900 dark:text-white`} ref={ aboutRef }>{ user.about }</span>
                        {isTruncated && (
                            <span className={`${isShowingMore && "ml-2"} text-blue-500 cursor-pointer hover:underline`} onClick={() => setIsShowingMore(prev => !prev)}>
                                {isShowingMore ? "Show less" : "Show more"}
                            </span>
                        )}
                    </div>
                </div>
                <button className={`${isUserSelf ? "hidden" : "block"} px-6 py-2 mt-6 text-white bg-blue-800 hover:bg-blue-900 text-lg rounded-md font-semibold`} onClick={() => {
                    if (JSON.parse(localStorage.getItem("golfPartyActive")) === false) return window.alert("You do not have an active golf party");

                    const partyData = JSON.parse(localStorage.getItem("golfParty"));

                    user.invited = !user.invited;
                    setIsInvited(user.invited);

                    if (user.invited) {
                        localStorage.setItem("golfParty", JSON.stringify({invited: [
                            ...partyData.invited,
                            user
                        ], date_time: partyData.date_time, venue: partyData.venue}));
                    } else {
                        localStorage.setItem("golfParty", JSON.stringify({invited: partyData.invited.filter(
                            invitedUser => invitedUser.id !== user.id
                        ), date_time: partyData.date_time, venue: partyData.venue}));
                    }
                }}>{isInvited ? "Remove Invite" : "Invite to Golf Party"}</button>
                <div className="h-screen"></div>
                <Footer/>
            </div>
        </section>
    )
}