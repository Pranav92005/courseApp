import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button"
import { FileText, Image, PlayCircle, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';

interface Lecture {
  id: string;
  title: string;
  materials: string[]; // Array of URLs
  date: string;
}

const getIcon = (url: string) => {
  const fileExtension = url.split('.').pop()?.toLowerCase(); // Extract file extension from URL

  switch (fileExtension) {
    case 'pdf':
      return <FileText className="h-4 w-4" />; // For PDFs, use the FileText icon
    case 'pptx':
    case 'ppt':
      return <Image className="h-4 w-4" />; // For PowerPoint files, use the Image icon
    case 'mp4':
    case 'mkv':
    case 'webm':
      return <PlayCircle className="h-4 w-4" />; // For video files, use the PlayCircle icon
    default:
      return null; // Return null if no matching file type
  }
};

const getMaterialTypeLabel = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  if (['pdf'].includes(extension!)) return 'Notes';
  if (['pptx', 'ppt'].includes(extension!)) return 'Slides';
  if (['mp4', 'mkv', 'webm'].includes(extension!)) return 'Recording';
  return 'Other'; // Default for unrecognized formats
};

export default function LecturesAndNotesPage() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [lecturesState, setLecturesState] = useState<Lecture[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/student/course/${id}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    }).then((res) => {
      console.log(res.data);
      setLecturesState(res.data.course.lectures || []); // Ensure the state is always an array
    }).catch((err) => {
      console.log(err);
    });
  }, [id]);

  const today = new Date().toISOString();

  // Filter lectures by title based on search term
  const filteredLectures = lecturesState.filter(lecture =>
    lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by lecture title
  );

  // Determine upcoming lectures (those scheduled for today or after)
  const upcomingLectures = lecturesState.filter(lecture => new Date(lecture.date) > new Date(today))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // All lectures (including past ones) sorted by date, with upcoming lectures first
  const allLectures = [...lecturesState]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (descending)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Lectures and Materials</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search lectures..."
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
              <TabsTrigger value="recording">Recordings</TabsTrigger>
            </TabsList>

            {(['all', 'notes', 'slides', 'recording'] as const).map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-6">
                {filteredLectures.length > 0 ? (
                  filteredLectures.map((lecture, index) => (
                    <Card key={lecture.id} className="mb-6">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>
                            <div className="text-blue-600 hover:underline">
                              {index + 1} | {lecture.title}
                            </div>
                          </CardTitle>
                        </div>
                        <CardDescription>Available materials for this lecture</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {lecture.materials
                            .filter(url => tabValue === 'all' || getMaterialTypeLabel(url).toLowerCase() === tabValue)
                            .map((url, materialIndex) => (
                              <li key={materialIndex} className="flex items-center">
                                {getIcon(url)}
                                <a href={url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                                  {getMaterialTypeLabel(url)}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No lectures found with this search term.</p>
                )}
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
                  {upcomingLectures.map((lecture, index) => (
                    <li key={lecture.id} className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{index + 1} | {lecture.title}</p>
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

        <div>
          <Card>
            <CardHeader>
              <CardTitle>All Lectures</CardTitle>
              <CardDescription>Complete list of lectures</CardDescription>
            </CardHeader>
            <CardContent>
              {allLectures.length > 0 ? (
                <ul className="space-y-4">
                  {allLectures.map((lecture, index) => (
                    <li key={lecture.id} className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{index + 1} | {lecture.title}</p>
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
                <p>No lectures available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
