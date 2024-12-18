import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Clock, User } from 'lucide-react'
import { Link } from "react-router-dom"


const topCourses = [
  {
    id: 1,
    name: "Machine Learning Fundamentals",
    details: "Learn the basics of machine learning algorithms and their applications.",
    teacher: "Dr. Alice Johnson",
    duration: "8 weeks"
  },
  {
    id: 2,
    name: "Web Development Bootcamp",
    details: "Comprehensive course covering front-end and back-end web development.",
    teacher: "Prof. Bob Smith",
    duration: "12 weeks"
  },
  {
    id: 3,
    name: "Data Science with Python",
    details: "Master data analysis, visualization, and machine learning using Python.",
    teacher: "Dr. Carol Davis",
    duration: "10 weeks"
  },
  {
    id: 4,
    name: "Mobile App Development",
    details: "Learn to build cross-platform mobile apps using React Native.",
    teacher: "Eng. David Wilson",
    duration: "6 weeks"
  }
]

export default function TopCourses() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Top Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topCourses.map((course) => (
            
          <Card key={course.id}>
            
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{course.details}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <User className="h-4 w-4 mr-2" />
                {course.teacher}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                {course.duration}
              </div>
            </CardContent>
            <div className="flex justify-center p-2">
        <Link to={'/content'}><button className="w-16 text-sm rounded-md text-white p-2 bg-slate-900">Enroll</button></Link> 
            </div>
            
          </Card>
        ))}
      </div>
    </div>
  )
}

