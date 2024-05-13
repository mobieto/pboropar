import { useState, useEffect } from "react";
import { Faqs } from "../data/faqs";
import { Fade } from "react-awesome-reveal";
import Footer from "../components/footer";
import SearchIcon from "../assets/images/search.png";

export default function HomePage() {
    const [activeFaqs, setActiveFaqs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFaqs, setFilteredFaqs] = useState(Faqs);

    function searchFaqs(e) {
        const query = e.target.value;

        setSearchQuery(query);
        setFilteredFaqs(Faqs.filter(faq => faq.title.toLowerCase().includes(query.toLowerCase())));
    }

    function toggleFaq(idx) {
        setActiveFaqs(prev => {
            const faqExists = prev.includes(idx);

            if (faqExists)
                return prev.filter(activeFaq => activeFaq !== idx);

            return [...prev, idx];
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <section className="flex flex-col justify-center items-center bg-white dark:bg-dark-secondary-color">
            <div className="flex flex-col max-w-[72rem] md:w-[60%] w-[80%] md:mt-72 mt-52 mb-64">
                <span className="text-2xl mb-6 font-bold text-gray-900 dark:text-white text-center">Frequently Asked Questions</span>
                <div className="md:w-[80%] w-[90%] max-w-[32rem] mb-8 mx-auto">
                    <label className="block text-md mb-2 font-medium text-gray-900 dark:text-white">Search FAQs</label>
                    <div className="flex flex-row bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2 dark:bg-dark-primary-color dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <img className="w-5 filter dark:invert-[100%] dark:sepia-[55%] dark:saturate-[2%] dark:hue-rotate-[233deg] dark:brightness-[107%] dark:contrast-100" src={SearchIcon} alt="Search"/> 
                        <input onChange={searchFaqs} value={searchQuery} placeholder="Search" className="ml-2 w-full bg-transparent border-none outline-none placeholder-gray-800 dark:placeholder-white"/>
                    </div>
                </div>
                <div className="w-full self-center bg-gray-300 dark:bg-dark-hover-color h-[1px] mb-6"></div>
                <Fade cascade={true} damping={.15} triggerOnce={true}>
                    {filteredFaqs.map(({ title, content }, index) => (
                        <div key={index} className="mb-3 rounded-lg p-3 bg-gray-200 dark:bg-dark-primary-color cursor-pointer" onClick={() => toggleFaq(index)}>
                            <div className="flex justify-between w-full items-center text-gray-900 dark:text-white">
                                <span className="flex-1 text-lg text-left font-semibold">{title}</span>
                                <span className={`w-2.5 h-8 mr-2 transition-transform font-bold text-lg ${activeFaqs.includes(index) ? 'transform rotate-180' : ''}`}>v</span>
                            </div>
                            {activeFaqs.includes(index) && (
                                <div className="mt-2">
                                    <span className="text-gray-900 dark:text-white font-light whitespace-pre-line">{content}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </Fade>
                <div className="w-full self-center bg-gray-300 dark:bg-dark-hover-color h-[1px] mt-6"></div>
            </div>
            <Footer/>
        </section>
    )
}