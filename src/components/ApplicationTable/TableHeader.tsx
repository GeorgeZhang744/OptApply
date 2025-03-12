const TableHeader = () => {
  return (
    <thead className="bg-gray-100 text-gray-800 text-sm font-semibold">
      <tr>
        <th className="p-3"></th>
        <th className="p-3">Company</th>
        <th className="p-3">Position</th>
        <th className="p-3">Application</th>
        <th className="p-3">Deadline</th>
        <th className="p-3">Remote</th>
        <th className="p-3">Status</th>
      </tr>
    </thead>
  );
}

export default TableHeader;