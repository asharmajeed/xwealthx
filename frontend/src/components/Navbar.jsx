import Header from "./Header";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Logo section */}
      <div style={styles.logo}><Header/></div>

      {/* Navigation links */}
      <div style={styles.navLinks}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#subject" style={styles.link}>Subject Drills</a>
        <a href="#revision" style={styles.link}>Revision Drills</a>
        <a href="#exam" style={styles.link}>Exam Drills</a>
        <a href="#go-premium" style={styles.premiumLink}>Go Premium</a>
      </div>
    </nav>
  );
};

// Inline styling for simplicity
const styles = {
  navbar: {
    position: 'fixed', // Makes the navbar fixed at the top
    top: 0,
    left: 0,
    width: '100%',    // Full width of the screen
    zIndex: 1000,     // Ensures it stays above other content
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  premiumLink: {
    color: '#FFD700', // Gold color for "Go Premium"
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
};

export default Navbar;
