import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {Suspense} from "react";
import {Loading, ProfileNotification} from "./components/indexC"
import { Home, Login,Register,Rol, NotFound } from "./view/index_view";
import { Estudents,Teachers, Foro, AulaVirtual, Config, Activity, Convocatorias, NewCourse, GestionCursos, DetalleCurso } from "./Private/indexPivate";
import ProtectedRoute from "./components/ProtectedRoute";
import CleanConvocatorias from "./utils/cleanConvocatorias";


//Visualizar componentes y más
const Rendering = React.lazy(() => import('./components/C_meta/meta')); //Pagina de prueba de nuevos componentes
//finn


// El componente que renderiza las diferentes páginas
// Cargando los componentes de manera dinámica con React.lazy
const App = () => {
  return (
    <Router>
    <ProfileNotification />
    <Suspense fallback={
      <Loading />
      }>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para la página de gestión de login */}
        <Route path="/login-form" element={<Login />} />

        {/* Ruta para la página de gestión de logout */}
        <Route path="/register-form" element={<Register />} />

        {/* Ruta para la página de gestión de rol (requiere autenticación pero permite sin rol) */}
        <Route 
          path="/view-rol" 
          element={
            <ProtectedRoute allowNoRole={true}>
              <Rol />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para la página de gestión de estudiantes (solo para estudiantes) */}
        <Route 
          path="/view-students" 
          element={
            <ProtectedRoute requiredRole="student">
              <Estudents />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para la página de gestión de profesores (solo para profesores) */}
        <Route 
          path="/view-teachers" 
          element={
            <ProtectedRoute requiredRole="profesor">
              <Teachers />
            </ProtectedRoute>
          } 
        />

        {/* Métodos del teacher (solo para profesores) */}

        {/* Ruta para la página de gestión de foros */}
        <Route 
          path="/view-foro" 
          element={
            <ProtectedRoute>
              <Foro />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para la página de gestión de Aulas virtuales */}
        <Route 
          path="/aula-virtual" 
          element={
            <ProtectedRoute requiredRole="profesor">
              <AulaVirtual />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para la página de gestión de configuración */}
        <Route 
          path="/view-config" 
          element={
            <ProtectedRoute>
              <Config />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para la página de actividad */}
        <Route 
          path="/view-activity" 
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para la página de convocatorias */}
        <Route 
          path="/view-convocatorias" 
          element={
            <ProtectedRoute>
              <Convocatorias />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para nuevo curso (estudiantes) */}
        <Route 
          path="/view-new-course" 
          element={
            <ProtectedRoute requiredRole="student">
              <NewCourse />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para gestión de cursos (profesores) */}
        <Route 
          path="/view-cursos" 
          element={
            <ProtectedRoute requiredRole="profesor">
              <GestionCursos />
            </ProtectedRoute>
          } 
        />

        {/* Ruta para detalle de curso (profesores y estudiantes) */}
        <Route 
          path="/detalle-curso/:cursoId" 
          element={
            <ProtectedRoute>
              <DetalleCurso />
            </ProtectedRoute>
          } 
        />

        {/* Herramienta de limpieza (solo profesores) */}
        <Route 
          path="/clean-convocatorias" 
          element={
            <ProtectedRoute requiredRole="profesor">
              <CleanConvocatorias />
            </ProtectedRoute>
          } 
        />

        {/* Fin Métodos del teacher */}

        {/* Ruta para la página de testing */}
        <Route path="/tester" element={<Rendering />} />
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
  );
};

export default App;
