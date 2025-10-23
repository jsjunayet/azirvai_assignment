// import { Badge } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  // const { theme } = useTheme();
  const experiences = [
    {
      position: "Night Audit",
      company: "Radisson Blu St. Helen's Hotel",
      location: "Stillorgan Rd, Booterstown, Dublin, A94 V6W3",
      duration: "Currently Working",
      type: "Full-time",
      description:
        "Managed  front desk operations at Radisson Blu Hotel by using Opera Cloud for Hotel Management, delivering exceptional guest service while performing end-of-day financial audits and reconciling accounts. Handled late check-ins and check-outs, resolved guest inquiries efficiently, and ensured accurate reporting to support hotel management.",
      achievements: [
        "There I am gaining experience for making correct financial reports at the end of the day and doing night audits without mistakes, helping hotel work run well, Handled busy and difficult situations during the night, like late check-ins and guest problems, and got good feedback from guests and managers.",
      ],
    },
    {
      position: "Assistant Service",
      company: "KSG Food",
      location: "St. James Hospital, Dublin, Ireland",
      duration: "Dec 2024 - july 2025",
      type: "Full-time",
      description:
        "Provided high-quality customer service in a fast-paced café environment, assisting with order preparation, maintaining cleanliness, and ensuring customer satisfaction. Contributed to smooth daily operations by supporting baristas, managing stock levels, and handling point-of-sale transactions.",
      achievements: [
        "Recognized for consistently delivering excellent customer service and improving customer satisfaction through friendly, efficient support.",
        "Played a key role in maintaining smooth workflow during peak hours, contributing to increased daily sales and positive customer feedback.",
      ],
    },
    {
      position: "Customer Service",
      company: "Viking River Cruise",
      location: "Porto, Portugal",
      duration: "May 2017 - June 2024",
      type: "Full-time",
      description:
        "From May 2017 to November 2023, I worked as a Customer Service at Viking River Cruise in Porto, Portugal. In this role, I was responsible for ensuring a smooth and enjoyable experience for international guests by assisting with their daily needs. I worked primarily in the restaurant and bar, providing food and beverage service, while also supporting the guest services team on certain days. This role required strong communication skills, attention to detail, and the ability to remain calm and professional in a fast-paced, multicultural environment. My flexibility and commitment to excellent service contributed to consistently positive guest experiences.",
      achievements: [
        " Consistently praised by guests and supervisors for outstanding service and professionalism across restaurant, bar, and guest services.",
        " Successfully adapted to multiple roles on board, contributing to smooth operations and enhancing overall guest satisfaction.",
        "Played a key part in maintaining high customer satisfaction scores during seasonal evaluations and guest feedback surveys",
        "Recognized for teamwork, reliability, and the ability to handle high-pressure situations during peak cruise seasons.",
      ],
    },
  ];

  return (
    <section id="experience" className=" pb-4 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A journey of growth and expertise in customer-facing roles across
            the hospitality and service industries in Ireland and Portugal.
            Proven ability to communicate effectively, manage diverse tasks, and
            provide high-quality service in fast-paced environments.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl  border transition-all duration-500  shadow-lg hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle
                      // className={`text-xl font-bold text-gray-900 ${
                      //   theme == "dark" ? " text-white" : ""
                      // }`}
                      >
                        {exp.position}
                      </CardTitle>
                      <p className="text-lg text-blue-600 font-semibold">
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex">
                  <p
                    className={`text-gray-600 
                    }`}
                  >
                    Job Description : {exp.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="flex items-start gap-2"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <div>
                  <h4
                    className={`font-semibold text-gray-900 mb-3 ${
                      theme == "dark" ? " text-white" : ""
                    }`}
                  >
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
