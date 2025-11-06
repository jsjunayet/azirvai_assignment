"use client";
import {
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  FileCode,
  GitBranch,
  Layers,
  Layout,
  Palette,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: [
      { name: "React", level: 95, icon: FileCode },
      { name: "Next.js", level: 90, icon: Zap },
      { name: "TypeScript", level: 95, icon: Code2 },
      { name: "Tailwind CSS", level: 92, icon: Palette },
      { name: "JavaScript", level: 97, icon: Code2 },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90, icon: Cpu },
      { name: "Python", level: 85, icon: Code2 },
      { name: "Express.js", level: 88, icon: Layers },
      { name: "FastAPI", level: 82, icon: Zap },
      { name: "REST APIs", level: 92, icon: Server },
    ],
  },
  {
    title: "Database & Cloud",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 90, icon: Database },
      { name: "MongoDB", level: 88, icon: Database },
      { name: "AWS", level: 85, icon: Cloud },
      { name: "Redis", level: 80, icon: Zap },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Container,
    skills: [
      { name: "Git", level: 95, icon: GitBranch },
      { name: "Docker", level: 88, icon: Container },
      { name: "CI/CD", level: 85, icon: Zap },
      { name: "Kubernetes", level: 82, icon: Cloud },
    ],
  },
];

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="py-10 px-4 bg-secondary/20 relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            inView
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-20 scale-95"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Technical Arsenal
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Proficiency
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise across
            various domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  inView
                    ? "opacity-100 translate-y-0 translate-x-0"
                    : `opacity-0 ${
                        index % 2 === 0 ? "-translate-x-20" : "translate-x-20"
                      } translate-y-20`
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`group bg-card border border-border rounded-2xl p-6 shadow-lg h-full relative overflow-hidden transition-all duration-500 ${
                    isHovered
                      ? "shadow-2xl shadow-primary/20 -translate-y-2 border-primary/50"
                      : "hover:shadow-xl"
                  }`}
                  style={{
                    transform: isHovered
                      ? "perspective(1000px) rotateX(2deg) rotateY(-2deg)"
                      : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                  }}
                >
                  {/* Animated gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Shine effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] transition-transform duration-1000 ${
                      isHovered ? "translate-x-[200%]" : ""
                    }`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div
                        className={`p-3 bg-gradient-to-br from-primary to-primary-glow rounded-xl shadow-lg transition-all duration-500 ${
                          isHovered
                            ? "scale-110 rotate-6 shadow-primary/50"
                            : "scale-100 rotate-0"
                        }`}
                      >
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold flex-1">
                        {category.title}
                      </h3>
                      <div
                        className={`text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary transition-all duration-300 ${
                          isHovered
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-4"
                        }`}
                      >
                        {category.skills.length} Skills
                      </div>
                    </div>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => {
                        const SkillIcon = skill.icon;
                        return (
                          <div
                            key={skillIndex}
                            className={`group/skill transition-all duration-500 ${
                              inView
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                            }`}
                            style={{
                              transitionDelay: `${
                                index * 150 + skillIndex * 80
                              }ms`,
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 group/skill-name cursor-default">
                                <div className="p-1.5 bg-primary/10 rounded-md group-hover/skill:bg-primary group-hover/skill:scale-110 transition-all duration-300">
                                  <SkillIcon className="w-3.5 h-3.5 text-primary group-hover/skill:text-primary-foreground" />
                                </div>
                                <span className="text-sm font-medium group-hover/skill:text-primary transition-colors">
                                  {skill.name}
                                </span>
                              </div>
                              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                                {skill.level}%
                              </span>
                            </div>

                            {/* Animated skill progress bar */}
                            <div className="h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
                              <div
                                className={`h-full bg-gradient-to-r from-primary via-primary-glow to-primary rounded-full transition-all duration-1000 ease-out relative shadow-lg ${
                                  inView ? "scale-x-100" : "scale-x-0"
                                }`}
                                style={{
                                  width: `${skill.level}%`,
                                  transformOrigin: "left",
                                  transitionDelay: `${
                                    index * 150 + skillIndex * 80 + 200
                                  }ms`,
                                }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[slide-in-right_2s_ease-in-out_infinite]" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
