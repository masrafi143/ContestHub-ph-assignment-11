import {
  RiHome4Line,
  RiTeamLine,
  RiTrophyLine,
  RiUserSettingsLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { CiCirclePlus, CiViewList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const { dbUser, dark } = useAuth();
  const { role } = useRole();

  const baseBg = dark ? "bg-[#0b132b] text-gray-100" : "bg-base-100 text-gray-900";
  const sidebarBg = dark ? "bg-[#111c44]" : "bg-base-200";
  const hoverBg = dark ? "hover:bg-[#1e2a5a]" : "hover:bg-base-300";

  const activeClass =
    "bg-primary text-primary-content rounded-xl border-l-4 border-blue-400";

  return (
    <div className={`drawer lg:drawer-open min-h-screen ${baseBg}`}>
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* TOP NAVBAR */}
        <nav
          className={`sticky top-0 z-20 h-14 flex items-center px-4 shadow-sm
            ${dark ? "bg-[#111c44]" : "bg-base-300"}`}
        >
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-sm btn-ghost lg:hidden"
          >
            ☰
          </label>
          <h2 className="ml-3 font-semibold text-sm opacity-80">
            Dashboard Panel
          </h2>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside
          className={`w-64 min-h-full flex flex-col border-r
            ${sidebarBg}
            ${dark ? "border-gray-700" : "border-base-300"}`}
        >
          {/* USER INFO */}
          <div
            className={`px-5 py-4 flex items-center gap-3 border-b
              ${dark ? "border-gray-700" : "border-base-300"}`}
          >
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-transparent">
                <img src={dbUser?.image} alt="User" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">
                {dbUser?.name || "User"}
              </p>
              <p className="text-xs opacity-60 capitalize">
                {role || "member"}
              </p>
            </div>
          </div>

          {/* MENU */}
          <ul className="menu px-3 py-4 gap-1 text-sm">
            {/* HOME */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition
                   ${isActive ? activeClass : ""}
                   ${hoverBg}`
                }
              >
                <RiHome4Line className="text-xl" />
                Home
              </NavLink>
            </li>

            {/* PROFILE */}
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition
                   ${isActive ? activeClass : ""}
                   ${hoverBg}`
                }
              >
                <CgProfile className="text-xl" />
                Profile
              </NavLink>
            </li>

            {/* CREATOR ROUTES */}
            {role === "creator" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-contests"
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition
                       ${isActive ? activeClass : ""}
                       ${hoverBg}`
                    }
                  >
                    <CiViewList className="text-xl" />
                    My Contests
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-contest"
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition
                       ${isActive ? activeClass : ""}
                       ${hoverBg}`
                    }
                  >
                    <CiCirclePlus className="text-xl" />
                    Add Contest
                  </NavLink>
                </li>
              </>
            )}

            {/* ADMIN ROUTES */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-contests"
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition
                       ${isActive ? activeClass : ""}
                       ${hoverBg}`
                    }
                  >
                    <RiTrophyLine className="text-xl" />
                    Manage Contests
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition
                       ${isActive ? activeClass : ""}
                       ${hoverBg}`
                    }
                  >
                    <RiUserSettingsLine className="text-xl" />
                    Manage Users
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/approve-creators"
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition
                       ${isActive ? activeClass : ""}
                       ${hoverBg}`
                    }
                  >
                    <RiCheckboxCircleLine className="text-xl" />
                    Approve Creators
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
