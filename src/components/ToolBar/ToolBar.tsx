import { IconSearch } from "@tabler/icons-react";

import { APPLICATION_STATUS } from "../../config/constants";

type IApplicationStatusFilterOptions = models.application.ApplicationStatus | "All Application";

const filterOptions: IApplicationStatusFilterOptions[] = ["All Application", ...APPLICATION_STATUS];

const ToolBar = () => {
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
        <input type="text" placeholder="Search" className="input input-secondary input-bordered w-64 md:w-96" />

        {/* Search Button */}
        <button className="btn btn-secondary">
          <IconSearch stroke={2} />
        </button>

        {/* Filter Button */}
        <div className="dropdown dropdown-end ml-2">
          <div tabIndex={0} role="button" className="btn text-lg btn-secondary rounded-md px-4">
            Filter ▾
          </div>

          {/* Filter Options */}
          <ul tabIndex={0} className="menu dropdown-content bg-neutral rounded-md shadow-md mt-2 w-52 z-50 border border-secondary">
            {filterOptions.map((option) => {
              return (
                <li key={option}>
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
