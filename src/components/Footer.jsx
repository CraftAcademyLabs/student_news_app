import React from "react";

const Footer = () => {
  return (
    <footer data-cy="footer">
      <p>Copyright © News In Progress {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
