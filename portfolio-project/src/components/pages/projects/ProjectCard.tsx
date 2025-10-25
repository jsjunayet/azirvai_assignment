import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }: { project: any }) => {
  console.log("project card details", project);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="block group transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {project.image ? (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 
               (max-width: 1200px) 50vw, 
               33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
            No Image
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            {project?.title}
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {project?.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project?.features
              ?.slice(0, 3)
              ?.map((feature: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-md"
                >
                  {feature}
                </span>
              ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {project.liveLink && (
                <Link
                  href={project.liveLink}
                  target="_blank"
                  className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline"
                >
                  Live →
                </Link>
              )}
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:underline"
                >
                  GitHub →
                </Link>
              )}
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:underline">
              Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProjectCard;
