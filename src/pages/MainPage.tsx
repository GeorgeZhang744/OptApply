import ToolBar from "../components/ToolBar/ToolBar";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";

const MainPage = () => {
  // Temp mock data
  const applications: models.application.IApplication[] = [
    {
      id: "1",
      company: "C1",
      position: "Web Dev",
      ApplicationUrl: "https://job.com/1",
      deadline: new Date("2025-10-05"),
      workLocation: "Remote",
      status: "Applied",
      salary: { min: 80000, max: 100000 },
      skillsRequired: ["HTML", "CSS", "React"],
      jobDescription: "Frontend development",
    },
    {
      id: "2",
      company: "C2",
      position: "Web Dev",
      ApplicationUrl: "https://job.com/1",
      deadline: new Date("2025-10-05"),
      workLocation: "Remote",
      status: "Applied",
      salary: { min: 80000, max: 100000 },
      skillsRequired: ["HTML", "CSS", "React"],
      jobDescription: "Frontend development",
    },
  ];

  return (
    <div className="container w-full mx-auto mt-8">
      <ToolBar />
      <ApplicationTable applications={applications}/>
    </div>
  );
};

export default MainPage;
