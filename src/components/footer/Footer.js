import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

import './footer.css'

const Footer = () => {
  return (
    <Fragment>
      <footer id="footer" className="footer">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center">
                <h3>Location</h3>
                <p>
                  In your ❤️
                </p>
                {/* <Link className="link" style={{ color: "#ffffff", textDecoration: "none" }} to="/policy">Privacy & Policy</Link> */}
              </div>
              <div className="col-md-4 text-center">
                <h3>Share with love</h3>
                <div className="icon">
                  <a href="https://www.facebook.com/bulbulahmed.tk" target="_blank">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/md-bulbul-ahmed-7b2496169/" target="_blank">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/bulbulahmed9" target="_blank">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <h3>About Collegebazar</h3>
                <p>
                  An E-commerce platform made by students for the benefit of students
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="f-bottom text-center">
          <div className="container">
            <h4>Copyright &copy; 2020 Sell BD. All Rights Reserved </h4>
          </div>
        </div> */}
      </footer>
    </Fragment>
  );
};

export default Footer;