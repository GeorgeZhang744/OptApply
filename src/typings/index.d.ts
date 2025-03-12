namespace models {
  // Example usage of this type directly in other files: models.example.ExampleType
  namespace example {
    interface ExampleType {
      exampleText: string;
      exampleVal: number;
    }
  }

  namespace application {
    // TODO: This is just a template typing. More status should be added when mock data is ready
    export type ApplicationStatus = "Applied" | "Interviewing" | "Offered" | "Rejected";

    export type WorkLocation = "Remote" | "On-site" | "Hybrid";

    /*
     * Possible styling for displaying salary:
     *  $80,000 - $100,000   -> (when both min/max are available: {min: 80000, max: 100000})
     *  Up to $90,000        -> (when only max is available: {max: 90000})  
     *  Starting at $75,000  -> (when only min is available: {min: 75000})
     *  $95,000              -> (when only fixed is available: {fixed: 95000})
     *  Salary not available -> (when the object is empty: {})
     */
    interface ISalaryRange {
      min?: number;
      max?: number;
      fixed?: number;
    }

    // TODO: This is also just a template typing. Might need update after mock data is ready
    interface IApplication {
      id: string;
      company: string;
      position: string;
      ApplicationUrl: string;
      deadline: Date;
      workLocation: WorkLocation;
      status: ApplicationStatus;
      salary: ISalaryRange;
      skillsRequired: string[];
      jobDescription: string;
      note?: string;
    }
  }
}
