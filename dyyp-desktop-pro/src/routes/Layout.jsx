import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <section className="header-section">
        <div className="header-title-wrapper">
          <Link to='/'>
            <img draggable="false" src="../public/DYYPLogoV6.png" alt="DYYP Logo" className="header-logo" />
          </Link>
          <h3 className="subtitle">desktop <span>pro</span></h3>
        </div>
      </section>
      <Outlet />
    </div>
  );
};

export default Layout;