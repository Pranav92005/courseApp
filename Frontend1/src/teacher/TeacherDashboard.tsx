import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseList } from '@/components/Teachercomponent/couse-list'
import { MainNav } from '@/components/Teachercomponent/mainNav'

export default function TDashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <header className=" shadow-md">
        {/* MainNav component is the navigation bar */}
        <MainNav />
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Teacher Dashboard</h1>

        <Card className="shadow-lg border-t-4 ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">Your Courses</CardTitle>
            <CardDescription className="text-gray-600">
              Manage your courses, schedule lectures, and upload materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CourseList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
