
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
import {toast,Toaster} from 'react-hot-toast'
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
  date: string
  materials: string[]
}


export function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const[isloading, setIsloading] = useState(false); 

  const [newLecture, setNewLecture] = useState({ title: '', date: '' })
  const [newMaterial, setNewMaterial] = useState<{ lectureId: number, file: File | null }>({ lectureId: 0, file: null });









  


useEffect(() => {
    setIsloading(true);
    axios.get(`${BACKEND_URL}/student/mycourse`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}}
    ).then((res)=>{
      console.log(res.data);
      setCourses(res.data.courses);
    }).catch((err)=>{console.log(err)}).finally(()=>{setIsloading(false)});
  },[]);

  const handleScheduleLecture = (courseId: number) => {
    //backend call to schedule lecture

    axios.post(`${BACKEND_URL}/lecture/add/${courseId}`, {
      title: newLecture.title,
      date: newLecture.date
    },{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    .then((res) => {
      console.log(res.data)
      toast.success('Lecture scheduled successfully!')
    }).catch((err) => {
      console.error(err)
      toast.error("Failed to schedule lecture");
    })


    }
  

    const handleUploadMaterial = async (lectureId: number) => {
      if (newMaterial.file) {
      setIsloading(true);
    
        const formData = new FormData();
        formData.append('file', newMaterial.file);
        
    
        try {
           await axios.post(`${BACKEND_URL}/lecture/upload/${lectureId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
        
    
          setNewMaterial({ lectureId: 0, file: null });
          toast.success('File uploaded successfully!');
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Failed to upload file');
        } finally {
          setIsloading(false);
        }
      }
    };

  return (
   
    <div className="space-y-6">
      <Toaster/>
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
                          <Button onClick={() => handleUploadMaterial(lecture._id)}>Upload</Button>
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

