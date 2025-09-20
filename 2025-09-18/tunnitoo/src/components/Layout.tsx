import { Link, Outlet } from "react-router";

function Layout() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/something">Something</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h1>Parent Content</h1>
          <Outlet />
        </div>
      </>
    );
}

export default Layout