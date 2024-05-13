import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Users } from "../data/users";
import Footer from "../components/footer";
import ProfilePic from "../assets/images/default-profile.png";
import SearchIcon from "../assets/images/search.png";

export default function GolfClub() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFriends, setFilteredFriends] = useState(Users);

    function searchFriends(e) {
        const query = e.target.value;

        setSearchQuery(query);
        setFilteredFriends(Users.filter(user => user.username.toLowerCase().includes(query.toLowerCase())));
    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <section className="flex flex-row bg-white dark:bg-dark-secondary-color">
            <div className="bg-white dark:bg-dark-secondary-color mt-32 w-full">
                <div className="flex flex-col items-center min-h-screen mb-32">
                    <div className="w-[80%] max-w-[32rem] mb-8">
                        <label className="block text-md mb-2 font-medium text-gray-900 dark:text-white">Search friends</label>
                        <div className="flex flex-row bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2 dark:bg-dark-primary-color dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <img className="w-5 filter dark:invert-[100%] dark:sepia-[55%] dark:saturate-[2%] dark:hue-rotate-[233deg] dark:brightness-[107%] dark:contrast-100" src={SearchIcon} alt="Search"/> 
                            <input onChange={searchFriends} value={searchQuery} placeholder="Search" className="ml-2 w-full bg-transparent border-none outline-none placeholder-gray-800 dark:placeholder-white"/>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap justify-center gap-4 max-w-[64rem]">
                        {filteredFriends.map(user => 
                            <div key={user.id} className="flex flex-row items-center cursor-pointer rounded-md bg-gray-200 dark:bg-dark-primary-color hover:bg-gray-300 dark:hover:bg-dark-hover-color w-80 h-28" onClick={() => {
                                navigate(`/user/${user.id}`);
                            }}>
                                <img className="w-24 h-24 ml-2" alt={`${user.name}'s Profile`} src={ ProfilePic }/>
                                <div className="flex flex-col h-24 ml-4">
                                    <span className="w-36 mb-1 truncate font-semibold text-gray-900 dark:text-white"> { user.username } </span>
                                    <span className="w-40 text-xs line-clamp-2 text-gray-900 dark:text-gray-300"> { user.about } </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer/>
            </div>
        </section>
    )
}