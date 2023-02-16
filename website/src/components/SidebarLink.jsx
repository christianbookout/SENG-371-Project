import { Link } from "react-router-dom";

export const SidebarLink = (props) => {
  return (
    <Link
      class="block rounded-lg p-2 hover:bg-blue-400 focus:bg-blue-700"
      to={props.link || "/stocks"}
    >
      {props.text}
    </Link>
  );
};
