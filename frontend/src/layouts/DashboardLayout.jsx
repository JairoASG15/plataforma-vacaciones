import Sidebar from "../components/Sidebar";


function DashboardLayout({children}){


    return(

        <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">


            <Sidebar />



            <main className="flex-1 p-5 md:p-6 overflow-hidden">


                <div className="max-w-7xl mx-auto">

                    {children}

                </div>


            </main>



        </div>


    )


}


export default DashboardLayout;

