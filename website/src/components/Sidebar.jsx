import { logout } from "../firebase";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = (props) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full w-64 flex-col bg-blue-500">
        <div className="w-100 text-wrap flex justify-center px-4 pt-8 pb-2 text-2xl font-bold text-white">
          <a href="/">Investment Trainer</a>
        </div>
        <div className="w-100 mx-4 h-0.5 rounded bg-white" />
        <div className="block h-full px-4 pb-2 pb-0 text-white">
          <SidebarLink text="Buy" link="/buy" />
          <SidebarLink text="Sell" link="/sell" />
          <SidebarLink text="News" link="/news" />
          <SidebarLink text="Settings" link="/settings" />
          <SidebarLink text="Graph for my cutie patootie" link="/graph" />
          <button
            onClick={() => logout()}
            className="w-full rounded-lg p-2 text-left text-white hover:bg-blue-400 focus:bg-blue-700"
          >
            Sign Out
          </button>
        </div>
        <div className="flex w-full self-end p-4">
          <div className="h-16 w-24 rounded-full bg-gray-200 text-white"></div>
          <div className="flex w-full items-center px-2 text-lg text-white">
            <p className="w-full">${props.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
