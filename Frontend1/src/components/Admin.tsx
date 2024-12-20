import React, { useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ActiveCourses from './Studentcomponent/ActiveCourse'
import TopCourses from '@/components/Studentcomponent/top_courses'

const Header = () => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className='text-center'>Admin Dashboard</CardTitle>
      <CardDescription className='text-center'>
        Manage your courses, schedule lectures, and upload materials
      </CardDescription>
    </CardHeader>
  </Card>
)

const ActiveCourse = () => (
  <Card className="mb-6">
    <CardHeader>
      {/* <CardTitle>Active Courses</CardTitle>
      <CardDescription>Your currently active courses</CardDescription> */}
    </CardHeader>
    <div className='mx-4'>
      <ActiveCourses />
    </div>
  </Card>
)

const TopCourse = () => (
  <Card>
    <CardHeader>
      <CardTitle>Top Courses</CardTitle>
      <CardDescription>Most popular courses</CardDescription>
    </CardHeader>
    <div className='mx-4'>
     <TopCourses />
    </div>
  </Card>
)

export default function Admin() {
  const [showActiveCourses, setShowActiveCourses] = useState(false)
  const [showTopCourses, setShowTopCourses] = useState(false)

  return (
    <main className="flex-grow p-6 md:p-8 bg-slate-300 h-screen">
      <Header />
      
      <div className="mb-6">
        <Button
          onClick={() => setShowActiveCourses(!showActiveCourses)}
          variant="outline"
          className="w-full justify-between"
        >
          {showActiveCourses ? 'Hide' : 'Show'} Active Courses
          {showActiveCourses ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
        {showActiveCourses && <ActiveCourse />}
      </div>
      
      <div>
        <Button
          onClick={() => setShowTopCourses(!showTopCourses)}
          variant="outline"
          className="w-full justify-between"
        >
          {showTopCourses ? 'Hide' : 'Show'} Top Courses
          {showTopCourses ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
        {showTopCourses && <TopCourse />}

      </div>
    </main>
  )
}

