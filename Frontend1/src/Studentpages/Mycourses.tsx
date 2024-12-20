import Navigation from "@/components/Studentcomponent/navigation"


import Footer from "@/components/Studentcomponent/footer"

import Activecourse from "@/components/Studentcomponent/ActiveCourse";

export default function Mycourses() {
 



  return (
    <div>
        <div className="bg-slate-300 h-full ">
            <div>
            <Navigation />
            <div className="mx-12 p-6 ">

            <h2 className="text-2xl font-bold mb-4">My Courses</h2>
            
<Activecourse/>
              
                
            </div>
            <Footer/>
            </div>
        </div>
      
    </div>
  )
}
