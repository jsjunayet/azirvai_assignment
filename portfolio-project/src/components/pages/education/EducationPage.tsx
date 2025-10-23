import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, GraduationCap } from "lucide-react";

const EducationPage = () => {
  // const { theme } = useTheme();
  const educationData = [
    {
      year: "2023 - 2025",
      degree: "Programming",
      institution: "Programming Hero",
      location: "Dhaka, bangladesh",
      description:
        "Since 2022, I have been actively learning web development and programming through Programming Hero Bangladesh. During this time, I have gained hands-on experience with modern technologies such as Node.js, Express.js, React.js, Redux, Next.js, and TypeScript. My backend skills include working with databases like PostgreSQL, MongoDB, MySQL, and tools such as Prisma, Mongoose, and Redis. I have also built and styled user interfaces using libraries and frameworks like MUI, DaisyUI, ShadCN, and Firebase for authentication and real-time data. This learning journey has helped me build a solid foundation in full-stack development, with a strong focus on writing clean, scalable, and maintainable code.",
      status: "Programming",
    },
    {
      year: "2015 - 2017",
      degree: "Business Administration and Finance",
      institution: "Master. D, -Professional School",
      location: "Lisbon, Portugal",
      description:
        "Successfully completed a Diploma in Business Administration and Finance with a total score of 93 out of 100. The program focused on organizational administration, communication and professional behavior, management, finance, human resources, telephone services, and information systems",
      status: "Diploma",
    },
    {
      year: "2013 - 2014",
      degree: " Diploma in Management and Leadership",
      institution: "Manchester City College of Technology",
      location: "Location: Manchester, England, UK.",
      description:
        "Obtained a Diploma in Management and Leadership. This program provided comprehensive knowledge in personal development, decision-making, financial control, and conducting management projects. It also emphasized strategic planning, effective team leadership, and performance management. The diploma strengthened my ability to lead with confidence and deliver results in dynamic business environments.",
      status: "Diploma",
    },
    {
      year: "2004 - 2008",
      degree: " Bachelor of Arts",
      institution: "National University of Bangladesh ",
      location: "Location: Dhaka, Bangladesh.",
      description:
        "Completed a Bachelor’s degree from the National University of Bangladesh, majoring in Bangla, English, Political Science, History, and Philosophy. The program offered a multidisciplinary foundation in language, literature, social sciences, and critical thinking. Through extensive coursework, I developed strong communication skills in both Bangla and English. I gained valuable insights into historical contexts, political structures, and philosophical reasoning. This diverse academic background enhanced my analytical abilities and broadened my cultural and intellectual perspective.",
      status: "Diploma",
    },
  ];

  return (
    <section
      id="education"
      className="relative min-h-screen flex items-center mb-10"
    >
      <div className="container mx-auto pt-28 md:px-6 px-2">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Educational History
          </h2>
          <p className="text-xl text-gray-600">My academic journey</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute md:left-8 left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="space-y-12">
              {educationData.map((edu, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="absolute md:left-6 left-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>

                  {/* Content */}
                  <div className="md:ml-20 ml-4 w-full">
                    <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <CardTitle className="text-sm md:text-xl font-bold text-gray-900 flex items-center gap-2">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                            {edu.degree}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-blue-600 font-semibold">
                            <Calendar className="w-4 h-4" />
                            {edu.year}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-800">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-gray-600">
                            {edu.location}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p>{edu.description}</p>
                        <div className="mt-4">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {edu.status}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationPage;
