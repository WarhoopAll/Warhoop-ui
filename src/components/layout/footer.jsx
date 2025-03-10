export default function Footer() {
    return (<>
        <footer className=" text-center w-full absolute bottom-0">
            <div className="w-full mx-auto max-w-screen-xl pb-4 px-4 flex flex-col items-center md:flex-row md:justify-between">
             <span className="text-sm text-customTXT sm:text-center dark:text-gray-400">
                © 2025
               <a href="https://warhoop.su/" className="hover:underline"> Warhoop™</a>. All Rights Reserved.
             </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-customTXT">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-customTXT">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-customTXT">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline text-customTXT">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    </>)
};