import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">   
              <Link className="nav-link" to="/nivel">Níveis</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/desenvolvedores">Desenvolvedores</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
