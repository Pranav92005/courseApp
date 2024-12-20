import { useEffect,useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';

 export interface Course {
  _id: string;
  title: string;
  description: string;
  teacher: 
    { _id:string;
      name: string;
      email: string;
      role: string;
      oauthId: string;
    }
  
  duration: string;
}

export default function TopCourses() {
  const[ courses, setCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    axios.get(`${BACKEND_URL}/student/courses`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}})
    .then((res)=>{
      console.log(res.data);
      setCourses(res.data.courses);
    }).catch((err)=>{console.log(err)}) 
  },[]);

  const enrollCourse = (id:string) => {
    axios.put(`${BACKEND_URL}/student/enroll/${id}`,{},{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}})
    .then((res)=>{
      console.log(res.data);
      toast.success(res.data.message);
      

    })
    .catch((err)=>{console.log(err);
      toast.error(err.response.data.message);
    });


  };

  return (
    <div className="mt-8">
     <Toaster />
      <h2 className="text-2xl font-bold mb-4">Top Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course: Course) => (
          <Card key={course._id}>
            <CardHeader>
              <CardTitle className='capitalize'>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm capitalize text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <User className="h-4 w-4 mr-2" />
                {course.teacher.name}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                {course.duration} weeks
              </div>
            </CardContent>
            <div className="flex justify-center p-2">
            
                <button  onClick={() => enrollCourse(course._id)} className="w-16 text-sm rounded-md text-white p-2 bg-slate-900">
                  Enroll
                </button>
            
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
