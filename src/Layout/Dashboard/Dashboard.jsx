import {
  RiHome4Line,
  RiTeamLine,
  RiTrophyLine,
  RiUserSettingsLine,
  RiCheckboxCircleLine,
  RiPenNibLine,
} from "react-icons/ri";
import { CiCirclePlus, CiViewList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const { dbUser } = useAuth();
  const { role } = useRole(); // 'admin', 'creator', or normal user

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 cursor-default">Dashboard</div>
          </nav>

          <div className="p-4">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col bg-base-200 is-drawer-close:w-17 is-drawer-open:w-64">
            {/* User Info */}
            <div className="w-full px-4 py-[13.5px] flex items-center gap-3 border-b border-base-300">
              <div className="avatar">
                <div className="w-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                  <img src={dbUser?.image} alt={dbUser?.name || "User"} />
                </div>
              </div>
              <div className="is-drawer-close:hidden">
                <p className="text-sm font-semibold">
                  {dbUser?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>

            {/* Menu */}
            <ul className="menu w-full grow gap-3 p-4 pt-6">
              {/* Always Visible Links */}
              <li className="tooltip tooltip-right before:z-50" data-tip="Home">
                <NavLink to="/">
                  <button className="w-full flex items-center justify-center lg:justify-start gap-4">
                    <RiHome4Line className="text-3xl" />
                    <span className="is-drawer-close:hidden">Home</span>
                  </button>
                </NavLink>
              </li>

              {/* Creator-routes */}
              {role === "creator" && (
                <>
                  <li
                    className="tooltip tooltip-right before:z-50"
                    data-tip="My Contests"
                  >
                    <NavLink
                      to="/dashboard/my-contests"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-content rounded-3xl"
                          : ""
                      }
                    >
                      <button className="w-full flex items-center justify-center lg:justify-start gap-4">
                        <CiViewList className="text-3xl" />
                        <span className="is-drawer-close:hidden">
                          My Contests
                        </span>
                      </button>
                    </NavLink>
                  </li>

                  <li
                    className="tooltip tooltip-right before:z-50"
                    data-tip="Apply as Creator"
                  >
                    <NavLink
                      to="/dashboard/apply-creator"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-content rounded-3xl"
                          : ""
                      }
                    >
                      <button className="w-full flex items-center justify-center lg:justify-start gap-4">
                        <RiTeamLine className="text-3xl" />
                        <span className="is-drawer-close:hidden">
                          Apply as Creator
                        </span>
                      </button>
                    </NavLink>
                  </li>

                  <li
                    className="tooltip tooltip-right before:z-50"
                    data-tip="Add Contest"
                  >
                    <NavLink
                      to="/dashboard/add-contest"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-content rounded-3xl"
                          : ""
                      }
                    >
                      <button className="w-full flex items-center justify-center lg:justify-start gap-4">
                        <CiCirclePlus className="text-3xl" />
                        <span className="is-drawer-close:hidden">
                          Add Contest
                        </span>
                      </button>
                    </NavLink>
                  </li>
                </>
              )}

              <li
                className="tooltip tooltip-right before:z-50"
                data-tip="Profile"
              >
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-primary-content rounded-3xl"
                      : ""
                  }
                >
                  <button className="w-full flex items-center justify-center lg:justify-start gap-4">
                    <CgProfile className="text-3xl" />
                    <span className="is-drawer-close:hidden">Profile</span>
                  </button>
                </NavLink>
              </li>

              {/* Admin Only Links */}
              {role === "admin" && (
                <>
                  <li
                    className="tooltip tooltip-right before:z-50"
                    data-tip="Manage Contests"
                  >
                    <NavLink
                      to="/dashboard/manage-contests"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-content rounded-3xl"
                          : ""
                      }
                    >
                      <button className="w-full flex items-center justify-center lg:justify-start gap-4">
                        <RiTrophyLine className="text-3xl" />
                        <span className="is-drawer-close:hidden">
                          Manage Contests
                        </span>
                      </button>
                    </NavLink>
                  </li>

                  <li
                    className="tooltip tooltip-right before:z-50"
                    data-tip="Manage Users"
                  >
                    <NavLink
                      to="/dashboard/manage-users"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-content rounded-3xl"
                          : ""
                      }
                    >
                      <button className="w-full flex items-center justify-center lg:justify-start gap-4">
                        <RiUserSettingsLine className="text-3xl" />
                        <span className="is-drawer-close:hidden">
                          Manage Users
                        </span>
                      </button>
                    </NavLink>
                  </li>

                  <li
                    className="tooltip tooltip-right before:z-50"
                    data-tip="Approve Creators"
                  >
                    <NavLink
                      to="/dashboard/approve-creators"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-content rounded-3xl"
                          : ""
                      }
                    >
                      <button className="w-full flex items-center justify-center lg:justify-start gap-4">
                        <RiCheckboxCircleLine className="text-3xl" />
                        <span className="is-drawer-close:hidden">
                          Approve Creators
                        </span>
                      </button>
                    </NavLink>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
