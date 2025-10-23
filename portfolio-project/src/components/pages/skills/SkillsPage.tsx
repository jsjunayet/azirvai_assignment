import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useTheme } from "@/contexts/ThemeContext";
import {
  Code,
  Database,
  Cpu,
  Wrench,
  GitBranch,
  Globe,
  Terminal,
  Cloud,
  Server,
  Layers,
  Settings,
  Lock,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

type Skill = {
  name: string;
  icon: LucideIcon;
};
interface SkillCardProps {
  title: string;
  skills: Skill[];
  delay: number;
}
const SkillsPage = () => {
  //   const { theme } = useTheme();

  // 🧠 Programming Languages
  const softSkills: Skill[] = [
    { name: "HTML5", icon: Globe },
    { name: "CSS3", icon: Globe },
    { name: "Tailwind CSS", icon: Wrench },
    { name: "JavaScript", icon: Code },
    { name: "TypeScript", icon: Code },
  ];

  // ⚛️ Frameworks / Libraries
  const tools: Skill[] = [
    { name: "React.js", icon: Cpu },
    { name: "Next.js", icon: Globe },
    { name: "Node.js", icon: Terminal },
    { name: "Express.js", icon: Server },
    { name: "Redux", icon: GitBranch },
    { name: "RTK Query", icon: GitBranch },
    { name: "Zod", icon: Layers },
    { name: "MUI", icon: Settings },
    { name: "ShadCN UI", icon: Settings },
    { name: "Tailwind CSS", icon: Wrench },
    { name: "JWT", icon: Lock },
  ];

  // 🗄️ Databases
  const databases: Skill[] = [
    { name: "MongoDB", icon: Database },
    { name: "Mongoose", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "Prisma", icon: Layers },
    { name: "Firebase", icon: Cloud },
  ];

  // ⚙️ Dev Tools
  const devTools: Skill[] = [
    { name: "Git & GitHub", icon: GitBranch },
    { name: "Postman", icon: Terminal },
    { name: "Vercel", icon: Cloud },
    { name: "Netlify", icon: Cloud },
    { name: "Render", icon: Cloud },
  ];

  return (
    <section
      id="skills"
      className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Proficiency
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comprehensive expertise in modern full-stack web development using
            the MERN stack (MongoDB, Express.js, React, Node.js).
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 🧠 Programming Languages */}
          <SkillCard
            title="Programming Languages"
            skills={softSkills}
            // theme={theme}
            delay={0.4}
          />

          {/* ⚛️ Frameworks / Libraries */}
          <SkillCard
            title="Frameworks / Libraries"
            skills={tools}
            // theme={theme}
            delay={0.6}
          />

          {/* 🗄️ Databases */}
          <SkillCard
            title="Databases"
            skills={databases}
            // theme={theme}
            delay={0.8}
          />

          {/* ⚙️ Dev Tools */}
          <SkillCard
            title="Dev Tools"
            skills={devTools}
            // theme={theme}
            delay={1.0}
          />
        </div>
      </div>
    </section>
  );
};

// 🔧 Reusable Skill Card Component
const SkillCard: React.FC<SkillCardProps> = ({
  title,
  skills,

  delay,
}) => (
  <Card
    className="shadow-lg border-0 animate-fade-in hover-lift"
    style={{ animationDelay: `${delay}s` }}
  >
    <CardHeader>
      <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 text-blue-800 dark:text-gray-200 text-sm md:text-base hover:from-blue-200 hover:to-purple-200 dark:hover:from-gray-700 dark:hover:to-gray-600 animate-fade-in"
            style={{ animationDelay: `${delay + index * 0.1}s` }}
          >
            <skill.icon className="w-4 h-4" />
            {skill.name}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SkillsPage;
