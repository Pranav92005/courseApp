// import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Login from './login'
import Dashboard from '../Studentpages/studashboard'
import TeacherDashboard from '../teacher/TeacherDashboard'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/config'
export default function Wrapper() {
    const { isAuthenticated,user } = useAuth0()

    console.log("Email",user)

    if(isAuthenticated){
        const role = user?.email && user.email.includes("@gmail.com") ? "student" : "teacher"

        //backend user data post request
        axios.post(`${BACKEND_URL}/student/add`, 
            {name:user?.name,
            email:user?.email,
            role:role,
            oauthId:user?.sub}).then((res)=>{
                console.log(res.data)
                const token = res.data.auth;
                localStorage.setItem("token",token)})
            .catch((err)=>{console.log(err)})






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
