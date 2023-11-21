import { useRoutes } from 'react-router-dom';
import './App.css';
import { Router } from './routes/routes';

function App() {
  const content = useRoutes(Router);
  return <div className='container'>{content}</div>;
}

export default App;
