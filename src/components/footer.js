import React from 'react';
// import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Finance App. Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;