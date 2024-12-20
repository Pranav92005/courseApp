

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MainNav } from '@/components/Teachercomponent/mainNav'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/config'
import {toast,Toaster} from 'react-hot-toast'

export default function CreateCoursePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setduration] = useState('')
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend

    console.log({ title, description,duration })
    axios.post(`${BACKEND_URL}/teacher/course`, {
      title,
      description,
      duration
    },{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    .then((res) => {
      console.log(res.data)
      toast.success('Course created successfully!')
    })
    .catch((err) => {
      console.error(err)
      toast.error('Failed to create course')
    })
    // For now, we'll just redirect to the dashboard
  
  }

  return (

    <>
    <div >
    <MainNav/>
    </div>
<Toaster/>
     <div className="max-w-2xl md:mx-auto mt-4 mx-4 ">
      <h1 className="text-3xl font-bold mb-6">Create a New Course</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
            <CardDescription>Fill in the details for your new course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Duration">Course Duration in Weeks</Label>
              <Input
                id="Duration"
                type='number'
                value={duration}
                onChange={(e) => setduration(e.target.value)}
                placeholder="Enter course Duration"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Course</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    
    </>
   
  )
}

