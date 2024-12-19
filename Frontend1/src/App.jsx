
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './Studentpages/studashboard'
import Courses from './Studentpages/Allcourses'
import LecturesAndNotesPage from './Studentpages/Allcontent'
import Wrapper from './components/Wrapper'
import MyCourses from './Studentpages/Mycourses' 
import TeacherDashboard from './teacher/TeacherDashboard'

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Wrapper />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/content" element={<LecturesAndNotesPage/>} />
      <Route path ="/teacher" element={<TeacherDashboard/>} />
      <Route path="/my-courses" element={<MyCourses />} />
    </Routes>
     
    </>
  )
}

export default App
