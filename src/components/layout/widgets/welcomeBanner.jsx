export default function WelcomeBanner() {
    return (<div className="relative bg-customBg p-4 sm:p-6 rounded-lg overflow-hidden mb-4 border border-customBrown">
            <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"/>
            <div className="relative">
                <h1 className="text-2xl md:text-3xl text-white font-bold mb-1">Open beta test 📢</h1>
                <p className="text-white text-xl">Server available for testing if you have problems you can contact us
                    by <a href="https://discord.gg/Dx8gzaJ3pc/" target="_blank" rel="noopener noreferrer">Discord💬</a>
                </p>
            </div>
        </div>);
}