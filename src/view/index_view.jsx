import { lazy } from 'react';

// Importaciones diferidas (lazy)
const Home = lazy(() => import('./home/Index'));
const Login = lazy(() => import('./auth/AuthForm'));
const Register = lazy(() => import('./auth/register/register'));
const Rol = lazy(() => import('./rol/rol'));
const NotFound = lazy(() => import('./error/NotFound'));

// Exportaciones
export {
  Home,
  Login,
  Register,
  Rol,
  NotFound,
};




