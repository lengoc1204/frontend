export default function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <div className="container">
          <div className="footer-contact d-block d-md-flex align-items-center px-5">
            <div>
              <h2 className="mb-0">Ready for a next project?</h2>
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
              <a href="#" className="footer-logo">
                Etravel
              </a>
              <p className="copyright">
                <small>© 2023</small>
              </p>
            </div>
            <div className="col-sm">
              <h3>Customers</h3>
              <ul className="list-unstyled links">
                <li>
                  <a href="#">Buyer</a>
                </li>
                <li>
                  <a href="#">Supplier</a>
                </li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Company</h3>
              <ul class="list-unstyled links">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Further Information</h3>
              <ul className="list-unstyled links">
                <li>
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
