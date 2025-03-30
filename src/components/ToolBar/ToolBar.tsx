import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { APPLICATION_STATUS } from "../../config/constants";

interface IToolBarProps {
  setFilterOption: (option: models.application.ApplicationStatusFilterOptions) => void;
  setSearchQuery: (query: string) => void;
  handleDelete: () => void;
}

const filterOptions: models.application.ApplicationStatusFilterOptions[] = ["All Application", ...APPLICATION_STATUS];

const ToolBar: React.FC<IToolBarProps> = ({ setFilterOption, setSearchQuery, handleDelete }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleFilterChange = (option: models.application.ApplicationStatusFilterOptions) => {
    setFilterOption(option);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchQuery(localSearchQuery);
  };

  return (
    <div className="navbar w-full px-4 sm:px-6 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      {/* Section 1: Add/Delete Buttons */}
      <div className="flex w-full sm:w-auto justify-start sm:justify-between space-x-2">
        <Link to="/add" className="btn btn-secondary text-lg">
          Add
        </Link>
        <button className="btn btn-secondary text-lg" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {/* Section 2: Search Bar */}
      <div className="flex w-full sm:w-auto items-center justify-start sm:justify-between space-x-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-secondary bg-neutral text-neutral-content input-bordered w-full sm:w-64 md:w-96"
          value={localSearchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="btn btn-secondary" onClick={handleSearchButtonClick}>
          <IconSearch stroke={2} />
        </button>
      </div>

      {/* Section 3: Filter Dropdown */}
      <div className="dropdown dropdown-end w-full sm:w-auto">
        <div tabIndex={0} role="button" className="btn text-lg btn-secondary rounded-md w-full sm:w-auto">
          Filter ▾
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-neutral text-neutral-content rounded-md shadow-md mt-2 w-full sm:w-52 border border-secondary z-50"
        >
          {filterOptions.map((option) => (
            <li key={option} onClick={() => handleFilterChange(option)}>
              <button className="w-full text-left font-bold px-4 py-2 hover:bg-accent hover:text-accent-content rounded-md transition duration-200">
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToolBar;
