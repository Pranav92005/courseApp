// import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Login from './login'
import Dashboard from '../Studentpages/studashboard'
import TeacherDashboard from '../teacher/TeacherDashboard'
export default function Wrapper() {
    const { isAuthenticated,user } = useAuth0()

    console.log("Email",user)

    if(isAuthenticated){
        if(user?.email && user.email.includes("@gmail.com")){
            return <Dashboard/>
        }
        else{
            return <TeacherDashboard/>
        }
    }
    
  return (
    <div>
        <Login />   
    </div>
  )
}
