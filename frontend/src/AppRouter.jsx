import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import EditUser from './pages/EditUser';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import CreateTask from './pages/CreateTask';
import Tasks from './pages/Tasks';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute allowedRoles={['administrador', 'decano', 'ayudante']}>
            <Users />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-user/:rut" 
        element={
          <ProtectedRoute allowedRoles={['administrador', 'decano', 'ayudante']}>
            <EditUser />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/works/task" 
        element={
          <ProtectedRoute allowedRoles={['administrador', 'decano', 'ayudante']}>
            <CreateTask />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/works/tasks" 
        element={
          <ProtectedRoute allowedRoles={['administrador', 'decano', 'ayudante']}>
            <Tasks />
          </ProtectedRoute>
        } 
      />
      {/* <Route 
        path="/edit-task/:_id" 
        element={
          <ProtectedRoute allowedRoles={['administrador', 'decano', 'ayudante']}>
            <EditTasks />
          </ProtectedRoute>
        } 
      /> */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
