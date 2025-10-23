import Header from "@/components/shared/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogManager from "./blogs/create/page";
import ProjectManager from "./projects/page";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full">
      {/* <Navigation /> */}
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="mb-2 text-4xl font-semibold mt-4">Dashboard</h1>
            <p className="text-muted-foreground ">
              Manage your portfolio content
            </p>
          </div>

          <Tabs defaultValue="blogs" className="space-y-6">
            <TabsList className="glass-effect w-full flex justify-between">
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="blogs" className="space-y-6">
              <BlogManager />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <ProjectManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
