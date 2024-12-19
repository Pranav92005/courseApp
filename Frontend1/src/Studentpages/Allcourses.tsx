import Footer from "@/components/Studentcomponent/footer";
import Navigation from "@/components/Studentcomponent/navigation";
import TopCourses from "@/components/Studentcomponent/top_courses";


export default function Courses() {
    return (
        <div className="bg-slate-300 h-full ">

            <div>
                <Navigation />
                <div className="mx-12 p-6 ">

                    <TopCourses />
                </div>
                <Footer/>

            </div>




        </div>
    )
}
