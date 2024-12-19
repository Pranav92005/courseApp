import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from 'react-router-dom';

export default function SimpleLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const { loginWithRedirect } = useAuth0();
  // const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate a login process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Here you would typically handle the actual login logic
    loginWithRedirect()
  }

  return (
    <div className='flex justify-center items-center h-screen bg-slate-950'>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Click the button below to log in</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full" 
          onClick={handleLogin} 
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </CardContent>
    </Card>
    </div>
  )
}

