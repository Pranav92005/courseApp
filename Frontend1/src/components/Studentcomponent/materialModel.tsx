// import { useState } from 'react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { FileText, Image, Link, PlayCircle } from 'lucide-react'

// interface Material {
//   id: string
//   title: string
//   type: 'notes' | 'slides' | 'references' | 'recording'
//   url: string
// }

// interface Lecture {
//   id: string
//   title: string
//   materials: Material[]
// }

// const lectures: Lecture[] = [
//   {
//     id: '1',
//     title: 'Introduction to React Hooks',
//     materials: [
//       { id: '1', title: 'React Hooks Basics', type: 'notes', url: '#' },
//       { id: '2', title: 'Hooks Presentation', type: 'slides', url: '#' },
//       { id: '3', title: 'React Docs - Hooks', type: 'references', url: '#' },
//       { id: '4', title: 'Hooks Live Coding Session', type: 'recording', url: '#' },
//     ]
//   },
//   {
//     id: '2',
//     title: 'State and Effect Hooks',
//     materials: [
//       { id: '5', title: 'useState and useEffect', type: 'notes', url: '#' },
//       { id: '6', title: 'State & Effects Slides', type: 'slides', url: '#' },
//       { id: '7', title: 'Hooks API Reference', type: 'references', url: '#' },
//       { id: '8', title: 'State & Effect Demo', type: 'recording', url: '#' },
//     ]
//   },
// ]

// interface MaterialsModalProps {
//   isOpen: boolean
//   onClose: () => void
//   initialTab: 'notes' | 'slides' | 'references' | 'recording'
// }

// export function MaterialsModal({ isOpen, onClose, initialTab }: MaterialsModalProps) {
//   const [activeTab, setActiveTab] = useState(initialTab)

//   const getIcon = (type: Material['type']) => {
//     switch (type) {
//       case 'notes': return <FileText className="h-4 w-4" />
//       case 'slides': return <Image className="h-4 w-4" />
//       case 'references': return <Link className="h-4 w-4" />
//       case 'recording': return <PlayCircle className="h-4 w-4" />
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[625px]">
//         <DialogHeader>
//           <DialogTitle>Course Materials</DialogTitle>
//           <DialogDescription>
//             Access all your lecture materials organized by type and lecture.
//           </DialogDescription>
//         </DialogHeader>
//         <Tabs defaultValue={activeTab} className="w-full" onValueChange={(value) => setActiveTab(value as MaterialsModalProps['initialTab'])}>
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="notes">Notes</TabsTrigger>
//             <TabsTrigger value="slides">Slides</TabsTrigger>
//             <TabsTrigger value="references">References</TabsTrigger>
//             <TabsTrigger value="recording">Recordings</TabsTrigger>
//           </TabsList>
//           {(['notes', 'slides', 'references', 'recording'] as const).map((tabValue) => (
//             <TabsContent key={tabValue} value={tabValue} className="mt-4">
//               {lectures.map((lecture) => (
//                 <div key={lecture.id} className="mb-4">
//                   <h3 className="font-semibold mb-2">{lecture.title}</h3>
//                   <ul className="space-y-2">
//                     {lecture.materials
//                       .filter((material) => material.type === tabValue)
//                       .map((material) => (
//                         <li key={material.id} className="flex items-center">
//                           {getIcon(material.type)}
//                           <a href={material.url} className="ml-2 text-blue-600 hover:underline">
//                             {material.title}
//                           </a>
//                         </li>
//                       ))}
//                   </ul>
//                 </div>
//               ))}
//             </TabsContent>
//           ))}
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   )
// }

