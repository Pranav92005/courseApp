import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const courses = [
  { id: 1, name: "Introduction to React", progress: 60 },
  { id: 2, name: "Advanced JavaScript", progress: 30 },
  { id: 3, name: "UX Design Fundamentals", progress: 80 },
]

export default function ActiveCourses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 px-4">
          {courses.map((course) => (
            <li key={course.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{course.name}</h3>
                <p className="text-sm text-gray-500">{course.progress}% complete</p>
              </div>
              <Button variant="outline">Continue</Button>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          
        </div>
      </CardContent>
    </Card>
  )
}

