import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  BookOpen,
  Calculator,
  FileCheck,
  PieChart,
  TrendingUp,
} from "lucide-react";

const ServicesPage = () => {
  const services = [
    {
      icon: <Calculator className="w-8 h-8 " />,
      title: "⚙️ Custom Web Applications",
      description:
        "Bespoke full-stack applications designed to fit your business logic, streamline operations, and scale as your business grows.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "🧹 Code Refactoring & Optimization",
      description:
        "Fixing messy or outdated codebases, improving performance, security, and maintainability — getting your project back on track with modern best practices.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "📦 API Development & Integration",
      description:
        "Robust REST APIs built with Express and Node.js — including secure authentication, third-party integrations, and real-time data handling.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "🛒 E-commerce Development",
      description:
        "Complete e-commerce solutions with cart systems, payment integration (Stripe, PayPal), product management, and responsive design.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "🌐 React Frontend Development",
      description:
        "Beautiful, interactive UIs built with React.js and styled with Tailwind CSS or ShadCN UI. Optimized for speed, accessibility, and responsiveness.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "☁️ Cloud & Database Integration",
      description:
        "Secure MongoDB Atlas and cloud-based deployments. Includes schema design, database modeling, and CRUD operations with Mongoose.",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <section
      id="services"
      className="py-2 bg-background transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 pt-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Do I Offer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scalable, efficient, and modern web development solutions using the
            MERN stack (MongoDB, Express.js, React, Node.js) — built to solve
            real problems and deliver impactful user experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border border-border shadow-lg hover:-translate-y-2 animate-fade-in hover-lift bg-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
