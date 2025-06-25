import {Routes , Route} from 'react-router-dom'
import { Home , Login } from './components/Public';
import { path } from './untils/constant';

function App() {
  return (
   <h1 className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home/>}></Route>
        <Route path={path.LOGIN} element={<Login/>}></Route>
      </Routes>
    </h1>

  );
}

export default App;
