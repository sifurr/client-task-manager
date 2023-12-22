import { Outlet } from "react-router-dom";



function App() {
  return (
    <div className="min-h-screen transition duration-200 dark:bg-gray-900">
      <Outlet />
    </div>
  );
}

export default App;
