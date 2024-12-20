import React, { useState, useEffect} from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ActiveCourses from './Studentcomponent/ActiveCourse'
import TopCourses from '@/components/Studentcomponent/top_courses'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
  loginId: string;
  password: string;
  setLoginId: (value: string) => void;
  setPassword: (value: string) => void;
}

function LoginForm({ loginId, password, setLoginId, setPassword }: LoginFormProps) {
  // const [loginId, setLoginId] = useState('')
  // const [password, setPassword] = useState('')
 
  return (
    <div className="flex items-center justify-center h-screen bg-slate-950">
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loginId">Login ID</Label>
            <Input
              id="loginId"
              type="text"
              value={loginId}
              className='border-gray-300 border-2'
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              className='border-gray-300 border-2'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}

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
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [show,setShow] = useState(false)

  useEffect(() => {
    if(loginId === 'admin' && password === 'admin'){
      setShow(true)
    }
}, [loginId, password]) 

  if(!show)
    return <LoginForm loginId={loginId} password={password} setLoginId={setLoginId} setPassword={setPassword}/>

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

