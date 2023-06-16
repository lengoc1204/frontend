import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <div className="container">
          <div className="footer-contact d-block d-md-flex align-items-center px-5">
            <div>
              <h2 className="mb-0">Mừng bạn đến với website của tui!!!</h2>
              <h3 className="text-dark">Let's get started!</h3>
            </div>
            <div className="ml-auto">
              <button href="#" className="btn-contact">
                Contact us
              </button>
            </div>
          </div>
          <div className="row footer-info">
            <div className="col-sm">
              <Link to="/" className="footer-logo">
                Etravel
              </Link>
              <p className="copyright">
                <small>© 2023</small>
              </p>
            </div>
            <div className="col-sm">
              <h3>Customers</h3>
              {/* <ul className="list-unstyled links">
                <li>
                <Link to="/">............</Link>
                </li>
                <li>
                  <Link to="/">..........</Link>
                </li>
              </ul> */}
            </div>
            <div className="col-sm">
              <h3>Company</h3>
              <ul class="list-unstyled links">
                <li>
                <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/tours">Tours</Link>
                </li>
                <li>
                  <Link to="/contact">Contact us</Link>
                </li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Further Information</h3>
              <ul className="list-unstyled links">
                <li>
                  <span>Terms &amp; Conditions</span>
                </li>
                <li>
                  <span>Privacy Policy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
