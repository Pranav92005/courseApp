
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom" 

import { Course } from "@/components/Studentcomponent/top_courses";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { Loader } from "lucide-react";

export default function Activecourse() {
const[ courses, setCourses] = useState<Course[]>([]);
const[isloading, setIsloading] = useState(false);  

useEffect(() => {
    setIsloading(true);
    axios.get(`${BACKEND_URL}/student/mycourse`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}}
    ).then((res)=>{
      console.log(res.data);
      setCourses(res.data.courses);
    }).catch((err)=>{console.log(err)}).finally(()=>{setIsloading(false)});
  },[]);

  return (
    <div>
        <div className="bg-slate-300 h-full ">
            <div>
                {
                    courses.length === 0 && <h2 className="text-2xl font-bold mb-4">No Active Courses ,kindly enroll</h2>
                }
        
        

            
            {isloading && <Loader className="mx-auto" size={50} />}
            {
              courses.map((course: Course) => (
                <div key={course._id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                  <h2 className="text-xl font-semibold capitalize ">{course.title}</h2>
                  <p className="text-gray-500 text-lg font-light capitalize">{course.description}</p>
                  <p className="text-gray-500 font-thin">Duration: {course.duration} week</p>
                  
                 <Link to={'/content'}><Button className="mt-1">Study</Button></Link> 
                </div>
              ))
            }

              
                
            
            
            </div>
        </div>
      
    </div>
  )
}
