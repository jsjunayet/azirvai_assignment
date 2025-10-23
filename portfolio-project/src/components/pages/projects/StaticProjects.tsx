// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { FileText, Globe } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaGithub } from "react-icons/fa";
// import { ProjectDetailsData } from "./StaticProjectData";

// const StaticProjectPage = () => {
//   return (
//     <section id="projects" className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             My Projects
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Showcasing full-stack projects focused on scalability, performance,
//             and user-centric design.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
//           {ProjectDetailsData?.slice(0, 4).map((project, index) => (
//             <Card
//               key={index}
//               className="group overflow-hidden shadow-lg border-0 hover:shadow-2xl transition-all duration-300"
//             >
//               <div className="relative overflow-hidden">
//                 <Image
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}
//                 >
//                   <div className="flex space-x-4">
//                     <Button
//                       size="sm"
//                       variant="secondary"
//                       className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
//                     >
//                       <a
//                         href={project.live}
//                         target="_blank"
//                         className="flex"
//                         rel="noopener noreferrer"
//                       >
//                         <Globe className="w-4 h-4 mr-2" />
//                         Live
//                       </a>
//                     </Button>
//                     <Link href={`https://github.com/azir9200`}>
//                       {" "}
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
//                       >
//                         <FaGithub className="w-4 h-4 mr-2" />
//                         Github
//                       </Button>
//                     </Link>

//                     <Link href={`/project/${project.id}`}>
//                       {" "}
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
//                       >
//                         <FileText className="w-4 h-4 mr-2" />
//                         View Details
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StaticProjectPage;
