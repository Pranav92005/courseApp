import {Link,useLocation} from 'react-router-dom'


import { cn } from '@/lib/utils'

export function MainNav() {
    const location=useLocation();
  const pathname = location.pathname;

  return (
    <nav className="flex space-x-4 bg-gray-300 h-16 p-4 items-center">
      <Link
        to="/"
        className={cn(
          "text-base font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>
      <Link
        to="/create-course"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/create-course" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Create Course
      </Link>
      <Link
        to="/profile"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/profile" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Profile
      </Link>
    </nav>
  )
}

