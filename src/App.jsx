import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Homepage from './pages/Homepage';
import SignUp from './pages/Signup';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import AddSnippet from './pages/Addsnippet';
import Allsnippets from './pages/Allsnippets';
import SnippetDetails from './pages/SnippetDetails';
import SnippetEdit from './pages/SnippetEdit';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split('.')[1])).payload;
        setUser(userInfo);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to='/dashboard'/>} />
        <Route path="/sign-in" element={!user ? <SignIn setUser={setUser} /> : <Navigate to='/dashboard'/>} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path='categories' element={<Categories />}/>
        <Route path='/snippets' element={<Allsnippets />}/>
        <Route path="/snippets/add" element={<AddSnippet />}/>
        <Route path="/snippets/:id" element={<SnippetDetails/>}/>
        <Route path='/snippets/:id/edit/' element={<SnippetEdit/>}/>
      </Routes>
    </div>
  );
}

export default App;




// Next steps:

// 1. Add the pages to the navbar at the top
// 2. create the snippet details route
// 3. Make sure I only see my categories and my snippets
// 4. make sure only I can change my category and my snippets
// 5. Styling
