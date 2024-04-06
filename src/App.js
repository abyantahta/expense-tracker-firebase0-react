// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/auth';
import ExpenseTracker from './pages/expense-tracker';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Auth/>} ></Route>
        <Route path='/expense-tracker' exact element={<ExpenseTracker/>} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
