
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './Studentpages/studashboard'
import Courses from './Studentpages/Allcourses'
import LecturesAndNotesPage from './Studentpages/Allcontent'
import Wrapper from './components/Wrapper'
import MyCourses from './Studentpages/Mycourses' 
import TDashboardPage from './teacher/TeacherDashboard'
import CreateCourse from './teacher/createCourse'
import Profile from './Studentpages/Profile'
function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Wrapper />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/content" element={<LecturesAndNotesPage/>} />
      <Route path ="/teacher" element={<TDashboardPage/>} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="create-course" element={<CreateCourse/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
     
    </>
  )
}

export default App
