import Navigation from '@/components/Studentcomponent/navigation'
import ActiveCourses from '@/components/Studentcomponent/activecourses'
import TopCourses from '@/components/Studentcomponent/top_courses'
import Footer from '@/components/Studentcomponent/footer'

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <main className="flex-grow p-6 md:p-8 bg-slate-300">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 gap-6 mx-4">
            <ActiveCourses />
            <TopCourses/>
           
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

