export const formatSalary = (salary: models.application.ISalaryRange): string => {
  const { min, max, fixed } = salary;
  if (min !== undefined && max !== undefined) {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }
  if (min !== undefined) {
    return `Starting at $${min.toLocaleString()}`;
  }
  if (max !== undefined) {
    return `Up to $${max.toLocaleString()}`;
  }
  if (fixed !== undefined) {
    return `$${fixed.toLocaleString()}`;
  }
  return "Salary not available";
};
