import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {Suspense} from "react";
import {Loading} from "./components/indexC"
import { Home, Login,Register,Rol, NotFound } from "./view/index_view";
import { Estudents,Teachers, Foro, A_virtual, Config } from "./Private/indexPivate";


//Visualizar componentes y más
const Rendering = React.lazy(() => import('./components/C_meta/meta')); //Pagina de prueba de nuevos componentes
//finn


// El componente que renderiza las diferentes páginas
// Cargando los componentes de manera dinámica con React.lazy
const App = () => {
  return (
    <Router>
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

        {/* Ruta para la página de gestión de estudiantes */}
        <Route path="/view-rol" element={<Rol />} />

        {/* Ruta para la página de gestión de estudiantes */}
        <Route path="/view-students" element={<Estudents />} />

        {/* Ruta para la página de gestión de estudiantes */}
        <Route path="/view-teachers" element={<Teachers />} />
            {/*Metodos del teacher*/}

            {/* Ruta para la página de gestión de foros */}
            <Route path="/view-foro" element={<Foro />} />

            {/* Ruta para la página de gestión de Aulas virtuales */}
            <Route path="/view-aVirtual" element={<A_virtual />} />

            {/* Ruta para la página de gestión de Aulas virtuales */}
            <Route path="/view-config" element={<Config />} />


            {/*Fin Metodos del teacher*/}
        {/* Ruta para la página de gestión de estudiantes */}
        <Route path="/tester" element={<Rendering />} />
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
  );
};

export default App;
