import { Outlet , Link , useLocation } from "react-router-dom";
import { useState , useEffect , useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThisUser } from "../data/thisUser";

export default function NavBar() {
  const [ navDisplay , setNavDisplay ] = useState("hidden");
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const subpaths = location.pathname.split("/");

  const paths = [
    {path: "/home", name: "Home", pathName: "home"},
    {path: `/user/${ThisUser.id}`, name: "My Profile", pathName: "user"}, 
    {path: "/golfclub", name: "Golf Club", pathName: "golfclub"},
    {path: "/golfparty", name: "Golf Party", pathName: "golfparty"},
  ];

  useEffect(() => {
    function onClick(event) {
      if (navDisplay === "block" && navRef.current && !navRef.current.contains(event.target)) {
        setNavDisplay("hidden");
      }
    } 

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    }
  }, [navDisplay]);

  return (
    <>
      <nav className="bg-gray-200 dark:bg-dark-primary-color fixed w-full z-50" ref={navRef}>
        <div className="flex flex-wrap items-center justify-between py-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-4 cursor-pointer" onClick={() => {
            navigate("/home");
          }}>pboropar</span>
          <div className="md:flex hidden h-10 items-center justify-center mr-6">
            <ul className="flex items-center gap-4 font-medium rounded-lg bg-gray-200 dark:bg-dark-primary-color">
              {paths.map(path => 
                <li key={path.pathname} className={`py-2 px-3 ${subpaths[1] === path.pathName ? "text-blue-600" : "text-black dark:text-white group transition duration-300"}`}>
                  <Link to={ path.path } onClick={() => {
                    setNavDisplay("hidden");
                  }}> { path.name }
                    <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white"></span>
                  </Link>
                </li>
              )}
              <button className="px-3 h-8 ml-12 bg-blue-800 hover:bg-blue-900 rounded-md text-white text-sm font-semibold" onClick={() => {
                navigate("/login");
              }}>Sign out</button>
            </ul>
          </div>
          <button className="flex md:hidden items-center justify-center w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-dark-hover-color mr-4" onClick={() => {
            setNavDisplay(prev => prev === "hidden" ? "block" : "hidden");
          }}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className={`flex md:hidden justify-center ${navDisplay} w-full`}>
            <ul className="flex flex-col gap-1 w-[60%] font-medium rounded-lg bg-gray-200 dark:bg-dark-primary-color">
              {paths.map(path => 
                <li key={path.pathname} className={`py-2 px-3 rounded cursor-pointer ${subpaths[1] === path.pathName ? "bg-blue-800 text-white" : "dark:bg-dark-primary-color bg-gray-200 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-dark-hover-color"}`} onClick={() => {
                  setNavDisplay("hidden");
                  navigate(path.path);
                }}>
                  { path.name }
                </li>
              )}
            </ul>
            <button className="absolute right-0 bottom-0 mb-4 mr-4 px-3 h-7 bg-blue-800 hover:bg-blue-900 rounded-md text-white text-sm font-semibold" onClick={() => {
              navigate("/login");
            }}>Sign out</button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
}