'use client'

import { useState } from 'react'
import {Link} from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, Image, LinkIcon, PlayCircle,  CheckCircle, Calendar } from 'lucide-react'

interface Material {
  id: string
  title: string
  type: 'notes' | 'slides' | 'references' | 'recording'
  url: string
}

interface Lecture {
  id: string
  title: string
  materials: Material[]
  completed: boolean
  date: string
}

const lectures: Lecture[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    materials: [
      { id: '1', title: 'React Hooks Basics', type: 'notes', url: '#' },
      { id: '2', title: 'Hooks Presentation', type: 'slides', url: '#' },
      { id: '3', title: 'React Docs - Hooks', type: 'references', url: '#' },
      { id: '4', title: 'Hooks Live Coding Session', type: 'recording', url: '#' },
    ],
    completed: false,
    date: '2023-06-15T10:00:00'
  },
  {
    id: '2',
    title: 'State and Effect Hooks',
    materials: [
      { id: '5', title: 'useState and useEffect', type: 'notes', url: '#' },
      { id: '6', title: 'State & Effects Slides', type: 'slides', url: '#' },
      { id: '7', title: 'Hooks API Reference', type: 'references', url: '#' },
      { id: '8', title: 'State & Effect Demo', type: 'recording', url: '#' },
    ],
    completed: false,
    date: '2023-06-22T10:00:00'
  },
  {
    id: '3',
    title: 'Context and Reducer Hooks',
    materials: [
      { id: '9', title: 'useContext and useReducer', type: 'notes', url: '#' },
      { id: '10', title: 'Advanced State Management', type: 'slides', url: '#' },
      { id: '11', title: 'Redux vs Context+Reducer', type: 'references', url: '#' },
      { id: '12', title: 'Building a Todo App', type: 'recording', url: '#' },
    ],
    completed: false,
    date: '2023-06-29T10:00:00'
  },
]

const getIcon = (type: Material['type']) => {
  switch (type) {
    case 'notes': return <FileText className="h-4 w-4" />
    case 'slides': return <Image className="h-4 w-4" />
    case 'references': return <LinkIcon className="h-4 w-4" />
    case 'recording': return <PlayCircle className="h-4 w-4" />
  }
}

export default function LecturesAndNotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [lecturesState, setLecturesState] = useState(lectures)

  const filteredLectures = lecturesState.map(lecture => ({
    ...lecture,
    materials: lecture.materials.filter(material => 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(lecture => lecture.materials.length > 0)

  const upcomingLectures = lecturesState.filter(lecture => new Date(lecture.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const toggleLectureCompletion = (lectureId: string) => {
    setLecturesState(prevLectures => 
      prevLectures.map(lecture => 
        lecture.id === lectureId ? { ...lecture, completed: !lecture.completed } : lecture
      )
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Lectures and Materials</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search lectures and materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
          
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="slides">Slides</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
              <TabsTrigger value="recording">Recordings</TabsTrigger>
            </TabsList>

            {(['all', 'notes', 'slides', 'references', 'recording'] as const).map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-6">
                {filteredLectures.map((lecture) => (
                  <Card key={lecture.id} className="mb-6">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>
                          <Link to={`/lectures/${lecture.id}`} className="text-blue-600 hover:underline">
                            {lecture.title}
                          </Link>
                        </CardTitle>
                        <Button
                          variant={lecture.completed ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleLectureCompletion(lecture.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {lecture.completed ? "Completed" : "Mark as Complete"}
                        </Button>
                      </div>
                      <CardDescription>Available materials for this lecture</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {lecture.materials
                          .filter(material => tabValue === 'all' || material.type === tabValue)
                          .map((material) => (
                            <li key={material.id} className="flex items-center">
                              {getIcon(material.type)}
                              <a href={material.url} className="ml-2 text-blue-600 hover:underline">
                                {material.title}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Lectures</CardTitle>
              <CardDescription>Schedule for your next sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingLectures.length > 0 ? (
                <ul className="space-y-4">
                  {upcomingLectures.map(lecture => (
                    <li key={lecture.id} className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{lecture.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(lecture.date).toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming lectures scheduled.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

