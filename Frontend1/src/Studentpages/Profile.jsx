import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth0 } from '@auth0/auth0-react'
export default function Profile() {

    const { user, logout } = useAuth0();
    
    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } })}
      

    return (
        <div className="container mx-auto py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.picture && (
                  <div className="flex justify-center">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="rounded-full w-32 h-32"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">Name</h2>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Email</h2>
                  <p>{user.email}</p>
                </div>
                <div>
                <div className='mb-2'>
                  <h2 className="text-xl font-semibold">Profession</h2>
                  <p>{user.email.includes("@gmail.com") ? "Student" : user.email.includes("@iitbbs.ac.in") ? "Teacher" : "Admin"}</p>
                </div>
                  <h2 className="text-xl font-semibold">Nickname</h2>
                  <p>{user.nickname}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Email Verified</h2>
                  <p>{user.email_verified ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Auth0 ID</h2>
                  <p>{user.sub}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Last Updated</h2>
                  <p>{user.updated_at}</p>
                </div>
                <Button onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    
}
