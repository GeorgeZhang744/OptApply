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
    export type IApplicationStatus = "Applied" | "Interviewing" | "Offered" | "Rejected";
  }
}
