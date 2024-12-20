
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/config'
import { useEffect } from 'react'
// import { Textarea } from '@/components/ui/textarea'

type Course = {
  _id: number
  title: string
  description: string
  lectures: Lecture[]
}

type Lecture = {
  _id: number
  title: string
  content: string
  date: string
  materials: string[]
}

// const initialCourses: Course[] = [
//   {
//     id: 1,
//     title: 'Introduction to React',
//     description: 'Learn the basics of React',
//     lectures: [
//       { id: 1, title: 'React Fundamentals', date: '2023-06-15', content:"", materials: ['Slides.pdf', 'Code.zip'] },
//       { id: 2, title: 'State and Props', date: '2023-06-22', content:"", materials: ['Slides.pdf'] },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Advanced JavaScript',
//     description: 'Deep dive into JavaScript concepts',
//     lectures: [
//       { id: 1, title: 'Closures and Scopes',content:"", date: '2023-06-18', materials: ['Notes.pdf'] },
//     ],
//   },
// ]

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const[isloading, setIsloading] = useState(false); 
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [newLecture, setNewLecture] = useState({ title: '', date: '' })
  const [newMaterial, setNewMaterial] = useState({ lectureId: 0, file: null as File | null })







  


useEffect(() => {
    setIsloading(true);
    axios.get(`${BACKEND_URL}/student/mycourse`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}}
    ).then((res)=>{
      console.log(res.data);
      setCourses(res.data.courses);
    }).catch((err)=>{console.log(err)}).finally(()=>{setIsloading(false)});
  },[]);

  const handleScheduleLecture = (courseId: number) => {
    if (newLecture.title && newLecture.date) {
      setCourses(courses.map(course => {
        if (course._id === courseId) {
          return {
            ...course,
            lectures: [...course.lectures, { _id: Date.now(), content: '', ...newLecture, materials: [] }]
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
        if (course._id === courseId) {
          return {
            ...course,
            lectures: course.lectures.map(lecture => {
              if (lecture._id === lectureId) {
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
       {isloading && <Loader className="mx-auto" size={50} />}
       {courses.length === 0 && <h2 className="text-2xl font-bold mb-4">No Active Courses ,kindly create one</h2>}
      {courses.map(course => (
        <Card key={course._id}>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Lectures</h3>
            <ul className="space-y-2">
              {course.lectures.map(lecture => (
                <li key={lecture._id} className="flex items-center justify-between">
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
                              onChange={(e) => setNewMaterial({ lectureId: lecture._id, file: e.target.files ? e.target.files[0] : null })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={() => handleUploadMaterial(course._id, lecture._id)}>Upload</Button>
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
                  <Button onClick={() => handleScheduleLecture(course._id)}>Schedule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

