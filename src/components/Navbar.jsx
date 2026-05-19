import { Link } from 'react-router'

function Navbar({ user, setUser }) {

  function logOut() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <div className="navbar-container">
      <div className="nav-links">
        <Link className='nav-item' to='/'>Homepage</Link>

        {user && (
          <>
            <Link className='nav-item' to='/dashboard'>Dashboard</Link>
            <Link className='nav-item' to='/categories'>Categories</Link>
            <Link className='nav-item' to='/snippets'>My Codes</Link>
            <Link className='nav-item' to='/snippets/add'>Add Code</Link>
          </>
        )}
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <span className='nav-item nav-user'>{user?.username}</span>
            <button className='btn-logout' onClick={logOut}>Log Out</button>
          </>
        ) : (
          <>
            <Link className='nav-item' to='/sign-up'>Sign up</Link>
            <Link className='nav-item' to='/sign-in'>Sign in</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;