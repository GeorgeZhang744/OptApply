import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import { APPLICATION_STATUS } from "../../config/constants";

interface IToolBarProps {
  setFilterOption: (option: models.application.ApplicationStatusFilterOptions) => void;
  setSearchQuery: (query: string) => void;
}

const filterOptions: models.application.ApplicationStatusFilterOptions[] = ["All Application", ...APPLICATION_STATUS];

const ToolBar: React.FC<IToolBarProps> = ({ setFilterOption, setSearchQuery }) => {
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
    <div className="navbar ">
      {/* Add, Edit, and Delete Buttons */}
      <div className="flex-1 space-x-2">
        <button className="btn btn-secondary text-lg">Add</button>
        <button className="btn btn-secondary text-lg">Edit</button>
        <button className="btn btn-secondary text-lg">Delete</button>
      </div>

      <div className="flex">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          className="input input-secondary bg-neutral text-neutral-content input-bordered w-64 md:w-96"
          value={localSearchQuery}
          onChange={handleSearchInputChange}
        />

        {/* Search Button */}
        <button className="btn btn-secondary" onClick={handleSearchButtonClick}>
          <IconSearch stroke={2} />
        </button>

        {/* Filter Button */}
        <div className="dropdown dropdown-end ml-2">
          <div tabIndex={0} role="button" className="btn text-lg btn-secondary rounded-md px-4">
            Filter ▾
          </div>

          {/* Filter Options */}
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-neutral text-neutral-content rounded-md shadow-md mt-2 w-52 z-50 border border-secondary"
          >
            {filterOptions.map((option) => {
              return (
                <li key={option} onClick={() => handleFilterChange(option)}>
                  <button className="w-full text-left font-bold px-4 py-2 hover:bg-accent hover:text-accent-content rounded-md transition duration-200">
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
