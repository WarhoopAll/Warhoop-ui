import Navigation from "@/components/features/navigation";
import WelcomeBanner from "@/components/layout/widgets/welcomeBanner";
import StatusServer from "@/components/layout/widgets/serverStatus";
import Footer from "@/components/layout/footer";

export default function Layout({children}) {
    return (<div className="min-h-screen flex flex-col relative">
            <div className="mx-auto mt-0 mb-44 container">
                <div className="mb-96">
                    <Navigation/>
                </div>
                <div>
                    <WelcomeBanner/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div className="md:col-span-3 mr-4">
                        {children}
                    </div>
                    <div className="md:col-span-1">
                        <StatusServer/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>);
};