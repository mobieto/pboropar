import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="flex flex-col gap-y-16 w-full bg-gradient-to-bl from-gray-200 to-white dark:from-dark-primary-color dark:to-dark-secondary-color">
            <div className="flex flex-row flex-wrap justify-between gap-x-64 gap-y-8 ml-8 mt-8">
                <div className="flex flex-col max-w-72">
                    <span className="text-gray-900 dark:text-white font-semibold text-2xl">pboropar</span>
                    <span className="text-gray-900 dark:text-white text-sm font-light mt-2">Meet and connect with golfers in Peterborough right now, right here</span>
                </div>

                <div className="flex flex-row flex-wrap gap-x-48 gap-y-8 mr-36">
                    <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white text-lg">Connect with us</span>
                        <ul className="text-gray-900 dark:text-white text-sm font-light mt-2">
                            <li>Instagram</li>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>YouTube</li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white text-lg">News & Info</span>
                        <ul className="text-gray-900 dark:text-white text-sm font-light mt-2">
                            <li className="hover:underline"><Link to="/faq">FAQ</Link></li>
                            <li>Newsletter</li>
                            <li>About us</li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white text-lg">Work with us</span>
                        <ul className="text-gray-900 dark:text-white text-sm font-light mt-2">
                            <li>Jobs</li>
                            <li>Internships</li>
                            <li>Accelerator program</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 mb-4 ml-8">
                <span className="text-gray-900 dark:text-white text-sm">© 2024 pboropar, Inc. All rights reserved.</span>
                <ul className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-gray-900 dark:text-white font-light text-xs">
                    <li className="hover:underline"><a href="#">Privacy Policy</a></li>
                    <li className="hover:underline"><a href="#">Terms of Use</a></li>
                    <li className="hover:underline"><a href="#">Accessibility</a></li>
                    <li className="hover:underline"><a href="#">Sitemap</a></li>
                    <li className="hover:underline"><a href="#">Modern Slavery Statement</a></li>
                </ul>
            </div>
        </div>
    )
}