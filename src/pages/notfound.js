import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/footer";

export default function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <section className="bg-white dark:bg-dark-secondary-color">
            <div className="flex flex-col justify-center items-center h-screen">
                <span className="font-semibold text-4xl text-center text-gray-900 dark:text-white">Oops! Something went wrong.</span>
                <button className="text-white font-medium mt-8 text-xl py-2 px-8 rounded-lg bg-blue-800 hover:bg-blue-900" onClick={() => {
                    navigate(-1);
                }}> Go back </button>
            </div>
            <Footer/>
        </section>
    )
}