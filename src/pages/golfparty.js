import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Users } from "../data/users";
import { Venues } from "../data/venues";
import Footer from "../components/footer";
import ProfilePic from "../assets/images/default-profile.png";
import SearchIcon from "../assets/images/search.png";

export default function GolfClub() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFriends, setFilteredFriends] = useState(Users);
    const [addedMembers, setAddedMembers] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState("");
    const dateRef = useRef(null);
    const sliderRef = useRef(null);
    const partyData = JSON.parse(localStorage.getItem("golfParty"));

    function searchFriends(e) {
        const query = e.target.value;

        setSearchQuery(query);
        setFilteredFriends(Users.filter(user => user.username.toLowerCase().includes(query.toLowerCase())));
    }
    
    useEffect(() => {
        const sessionAddedMembers = JSON.parse(localStorage.getItem("sessionAddedMembers"));

        if (sessionAddedMembers) {
            setAddedMembers(sessionAddedMembers);

            setFilteredFriends(prev =>
                prev.map(friend => (
                    sessionAddedMembers.find(member => member.id === friend.id)
                        ? Object.assign(friend, {partySelected: true})
                        : friend
                    )
                )
            );
        } else {
            setFilteredFriends(prev => prev.map(friend => (Object.assign(friend, {partySelected: false}))));
        }
        
        if (JSON.parse(localStorage.getItem("golfPartyActive")) === true)
            dateRef.current.value = partyData.date_time;

        if (localStorage.getItem("golfPartyActive") === null)
            localStorage.setItem("golfPartyActive", false);

        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("golfPartyActive")) === true) {
            const oldData = JSON.parse(localStorage.getItem("golfParty"));
            localStorage.setItem("golfParty", JSON.stringify({invited: filteredFriends.filter(friend => friend.invited), date_time: oldData.date_time, venue: oldData.venue}));
        }
    }, [filteredFriends])

    return (
        <section className="flex flex-row bg-white dark:bg-dark-secondary-color">
            <div className="bg-white dark:bg-dark-secondary-color mt-32 w-full">
                { JSON.parse(localStorage.getItem("golfPartyActive")) === false &&
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-gray-900 dark:text-white font-bold text-2xl mb-8">Create a Golf Party</span>

                        <div className="w-[80%] max-w-[32rem] mb-8">
                            <label className="block text-md mb-2 font-medium text-gray-900 dark:text-white">Invite friends to party</label>
                            <div className="flex flex-row bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2 dark:bg-dark-primary-color dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <img className="w-5 filter dark:invert-[100%] dark:sepia-[55%] dark:saturate-[2%] dark:hue-rotate-[233deg] dark:brightness-[107%] dark:contrast-100" src={SearchIcon} alt="Search"/> 
                                <input onChange={searchFriends} value={searchQuery} placeholder="Search" className="ml-2 w-full bg-transparent border-none outline-none placeholder-gray-800 dark:placeholder-white"/>
                            </div>
                        </div>

                        <span className="block text-lg font-medium text-gray-900 dark:text-white mb-4">Select users to invite</span>
                        <div className="max-w-[44rem] w-[80%] bg-gray-300 dark:bg-gray-700 h-[1px] mb-6"></div>

                        <div className="flex flex-row flex-wrap justify-center gap-4 max-w-[64rem] mb-8">
                            {filteredFriends.map(user => 
                                <div key={user.id} className={`${user.partySelected && "border-2"} flex flex-row items-center cursor-pointer rounded-md border-blue-800 bg-gray-200 dark:bg-dark-primary-color hover:bg-gray-300 dark:hover:bg-dark-hover-color w-64 h-14`} onClick={() => {
                                    if (addedMembers.find(member => member.id === user.id)) {
                                        user.partySelected = false;

                                        localStorage.setItem("sessionAddedMembers", JSON.stringify(
                                            addedMembers.filter(member => member.id !== user.id)
                                        ));

                                        setAddedMembers(prev =>
                                            prev.filter(member => member.id !== user.id)
                                        );
                                    } else {
                                        user.partySelected = true;

                                        localStorage.setItem("sessionAddedMembers", JSON.stringify([
                                            ...addedMembers,
                                            user
                                        ]));

                                        setAddedMembers(prev => [
                                            ...prev,
                                            user
                                        ]);
                                    }
                                }}>
                                    <img className="w-10 h-10 ml-2" alt={`${user.name}'s Profile`} src={ ProfilePic }/>
                                    <span className="w-40 ml-2 truncate font-semibold text-gray-900 dark:text-white"> { user.username } </span>
                                </div>
                            )}
                        </div>

                        <span className="block text-lg font-medium text-gray-900 dark:text-white mt-16 mb-4">Select date & time</span>
                        <div className="max-w-[44rem] w-[80%] bg-gray-300 dark:bg-gray-700 h-[1px] mb-6"></div>

                        <input className="px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-100 text-gray-900 mb-8" type="datetime-local" ref={dateRef}/>

                        <span className="block text-lg font-medium text-gray-900 dark:text-white mt-16 mb-4">Select venue</span>
                        <div className="max-w-[44rem] w-[80%] bg-gray-300 dark:bg-gray-700 h-[1px] mb-6"></div>

                        <div className="relative flex items-center max-w-[66rem] md:w-full w-[24rem] mb-16">
                            <button className="px-2 py-2 text-gray-900 dark:text-white text-4xl font-bold" onClick={() => {
                                sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 300;
                            }}>{"<"}</button>
                            <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" ref={sliderRef}>
                                {Venues.map(venue =>
                                    <div key={venue.name} className="md:w-[300px] w-[120px] md:h-[22rem] h-[11rem] inline-block p-2 mx-1 bg-gray-200 dark:bg-dark-primary-color">
                                        <div className="flex flex-col">
                                            <span className="font-bold md:text-lg text-xs text-gray-900 dark:text-white">{venue.name}</span>
                                            <img src={venue.image} alt={venue.name} className="w-full md:h-48 h-20 mt-2"/>
                                            <button className="bg-blue-800 hover:bg-blue-900 rounded-md md:py-1.5 py-0.5 md:mt-[4rem] mt-[2rem] font-semibold text-white md:text-lg text-sm" onClick={() => {
                                                setSelectedVenue(venue.name);
                                            }}>{selectedVenue === venue.name ? "Selected" : "Select Venue"}</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button className="px-2 py-2 text-gray-900 dark:text-white text-4xl font-bold" onClick={() => {
                                sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 300;
                            }}>{">"}</button>
                        </div>
                        
                        <div className="flex flex-row gap-10 mt-6 mb-32">
                            <button className="px-8 py-2 text-gray-900 dark:text-white bg-red-700 hover:bg-red-800 text-xl rounded-md font-semibold" onClick={() => {
                                localStorage.removeItem("sessionAddedMembers");

                                navigate("/home");
                            }}>Cancel</button>

                            <button className="px-8 py-2 text-white bg-blue-800 hover:bg-blue-900 text-xl rounded-md font-semibold" onClick={() => {
                                if (!dateRef.current.value) return window.alert("Please select a date & time before continuing");
                                if (selectedVenue === "") return window.alert("Please select a venue before continuing");

                                localStorage.removeItem("sessionAddedMembers");
                                localStorage.setItem("golfParty", JSON.stringify({invited: addedMembers, date_time: dateRef.current.value, venue: selectedVenue}));
                                localStorage.setItem("golfPartyActive", true);

                                addedMembers.forEach(member => member.invited = true);

                                navigate("/home");
                            }}>Create</button>
                        </div>
                    </div>
                }

                { JSON.parse(localStorage.getItem("golfPartyActive")) === true &&
                    <div className="flex flex-col justify-center items-center">
                    <span className="text-gray-900 dark:text-white font-bold text-2xl mb-4">Manage Golf Party</span>
                    <span className="text-gray-900 dark:text-white font-light text-lg mb-12">{partyData.date_time.split("T").join(" - ")} at {partyData.venue}</span>

                    <div className="w-[80%] max-w-[32rem] mb-8">
                        <label className="block text-md mb-2 font-medium text-gray-900 dark:text-white">Invite friends to party</label>
                        <div className="flex flex-row bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2 dark:bg-dark-primary-color dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <img className="w-5 filter dark:invert-[100%] dark:sepia-[55%] dark:saturate-[2%] dark:hue-rotate-[233deg] dark:brightness-[107%] dark:contrast-100" src={SearchIcon} alt="Search"/> 
                            <input onChange={searchFriends} value={searchQuery} placeholder="Search" className="ml-2 w-full bg-transparent border-none outline-none placeholder-gray-800 dark:placeholder-white"/>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap justify-center gap-4 max-w-[64rem] mb-8">
                        {filteredFriends.map(user => 
                            <div key={user.id} className={"flex flex-row items-center cursor-pointer rounded-md border-blue-800 bg-gray-200 dark:bg-dark-primary-color w-64 h-14"}>
                                <img className="w-10 h-10 ml-2" alt={`${user.name}'s Profile`} src={ ProfilePic }/>
                                <span className="w-40 ml-2 truncate font-semibold text-gray-900 dark:text-white"> { user.username } </span>
                                <button className={`${user.invited ? "bg-red-700 hover:bg-red-800" : "bg-blue-800 hover:bg-blue-900"} rounded-sm text-white font-semibold py-0.5 px-2 mr-4`} onClick={() => {
                                    const invited = user.invited;
                                    setFilteredFriends(prev => prev.map(friend => friend.id === user.id ? Object.assign(friend, {invited: !invited}) : friend));
                                }}>{user.invited ? "Uninvite" : "Invite"}</button>
                            </div>
                        )}
                    </div>

                    <span className="block text-lg font-medium text-gray-900 dark:text-white mt-16 mb-4">Edit date & time</span>
                    <div className="max-w-[44rem] w-[80%] bg-gray-300 dark:bg-gray-700 h-[1px] mb-6"></div>

                    <input className="px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-100 text-gray-900 mb-16" type="datetime-local" ref={dateRef}/>

                    <div className="flex flex-row sm:gap-10 gap-8 mt-6 mb-32">
                        <button className="px-6 py-2 text-gray-900 dark:text-white bg-red-700 hover:bg-red-800 text-lg rounded-md font-semibold" onClick={() => {
                            localStorage.removeItem("sessionAddedMembers");
                            localStorage.removeItem("golfParty");
                            localStorage.setItem("golfPartyActive", false);

                            Users.forEach(member => member.invited = false);

                            navigate("/home");
                        }}>Delete Party</button>

                        <button className="px-6 py-2 text-gray-900 dark:text-white bg-blue-800 hover:bg-blue-900 text-lg rounded-md font-semibold" onClick={() => {
                            const oldVenue = JSON.parse(localStorage.getItem("golfParty")).venue;

                            localStorage.removeItem("sessionAddedMembers");
                            localStorage.setItem("golfParty", JSON.stringify({invited: filteredFriends.filter(friend => friend.invited), date_time: dateRef.current.value, venue: oldVenue}));

                            navigate("/home");
                        }}>Save Changes</button>
                    </div>
                </div>
                }
                <Footer/>
            </div>
        </section>
    )
}