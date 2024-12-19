

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'

type Course = {
  id: number
  title: string
  description: string
  lectures: Lecture[]
}

type Lecture = {
  id: number
  title: string
  date: string
  materials: string[]
}

const initialCourses: Course[] = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    lectures: [
      { id: 1, title: 'React Fundamentals', date: '2023-06-15', materials: ['Slides.pdf', 'Code.zip'] },
      { id: 2, title: 'State and Props', date: '2023-06-22', materials: ['Slides.pdf'] },
    ],
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript concepts',
    lectures: [
      { id: 1, title: 'Closures and Scopes', date: '2023-06-18', materials: ['Notes.pdf'] },
    ],
  },
]

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [newLecture, setNewLecture] = useState({ title: '', date: '' })
  const [newMaterial, setNewMaterial] = useState({ lectureId: 0, file: null as File | null })

  const handleScheduleLecture = (courseId: number) => {
    if (newLecture.title && newLecture.date) {
      setCourses(courses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            lectures: [...course.lectures, { id: Date.now(), ...newLecture, materials: [] }]
          }
        }
        return course
      }))
      setNewLecture({ title: '', date: '' })
    }
  }

  const handleUploadMaterial = (courseId: number, lectureId: number) => {
    if (newMaterial.file) {
      setCourses(courses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            lectures: course.lectures.map(lecture => {
              if (lecture.id === lectureId) {
                return {
                  ...lecture,
                  materials: [...lecture.materials, newMaterial.file!.name]
                }
              }
              return lecture
            })
          }
        }
        return course
      }))
      setNewMaterial({ lectureId: 0, file: null })
    }
  }

  return (
    <div className="space-y-6">
      {courses.map(course => (
        <Card key={course.id}>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Lectures</h3>
            <ul className="space-y-2">
              {course.lectures.map(lecture => (
                <li key={lecture.id} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{lecture.title}</span>
                    <span className="text-sm text-muted-foreground ml-2">({lecture.date})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{lecture.materials.length} materials</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Upload </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Material for {lecture.title}</DialogTitle>
                          <DialogDescription>Add new study materials for this lecture.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="material" className="text-right">
                              File
                            </Label>
                            <Input
                              id="material"
                              type="file"
                              className="col-span-3"
                              onChange={(e) => setNewMaterial({ lectureId: lecture.id, file: e.target.files ? e.target.files[0] : null })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={() => handleUploadMaterial(course.id, lecture.id)}>Upload</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Schedule Lecture</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule a New Lecture</DialogTitle>
                  <DialogDescription>Add a new lecture to this course.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newLecture.title}
                      onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newLecture.date}
                      onChange={(e) => setNewLecture({ ...newLecture, date: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => handleScheduleLecture(course.id)}>Schedule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

