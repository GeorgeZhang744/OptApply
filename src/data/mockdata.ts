export interface IApplication {
  id: string;
  company: string;
  position: string;
  ApplicationUrl: string;
  deadline: Date;
  workLocation: string;
  status: string;
  salary: {min: number; max: number};
  skillsRequired: string[];
  jobDescription: string;
  note: string;
}

//mock applications
export const mockApplications: IApplication[] = [
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
    note: "",
  },
  {
    id: "2",
    company: "C2",
    position: "Backend Dev",
    ApplicationUrl: "https://job.com/2",
    deadline: new Date("2025-11-10"),
    workLocation: "Hybrid",
    status: "Interview Scheduled",
    salary: { min: 90000, max: 110000 },
    skillsRequired: ["Node.js", "Express", "MongoDB"],
    jobDescription: "Backend API development",
    note: "Need to prepare for system design interview",
  },
  {
    id: "3",
    company: "C3",
    position: "Full Stack Engineer",
    ApplicationUrl: "https://job.com/3",
    deadline: new Date("2025-12-01"),
    workLocation: "Onsite",
    status: "Offer Received",
    salary: { min: 95000, max: 120000 },
    skillsRequired: ["React", "Node.js", "PostgreSQL"],
    jobDescription: "Developing full-stack applications",
    note: "Considering offer",
  },
  {
    id: "4",
    company: "C4",
    position: "Data Analyst",
    ApplicationUrl: "https://job.com/4",
    deadline: new Date("2025-11-01"),
    workLocation: "Onsite",
    status: "Interview Scheduled",
    salary: {min:90000, max: 110000},
    skillsRequired: ["SQL", "R", "Python"],
    jobDescription: "Organizing and interpreting data",
    note: "",
  },
];