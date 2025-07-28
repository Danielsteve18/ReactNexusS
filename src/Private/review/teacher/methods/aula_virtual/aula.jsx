import Style from "../aula_virtual/aula.module.css";

function AulaVirtual(){
    return(
        <>
        <header>
          <h1>Aula Virtual - Nexus</h1>
        </header>
        <main>
          <nav>
            <a href="#" id="view-folders">
              Ver Carpetas
            </a>
            <a href="#" id="view-grades">
              Ver Notas
            </a>
            <a href="#" id="view-students">
              Ver Alumnos
            </a>
            <a href="#" id="view-pending">
              Actividades Pendientes
            </a>
          </nav>
          <div className={Style.content} id="content">
            <section id="folders-section">
              <button id="add-folder" className={Style.btn}>
                Crear Carpeta
              </button>
              <button id="save-changes" className={Style.btn}>
                Guardar Cambios
              </button>
              <ul id="folders-list" />
              <div id="course-content">
                {/* Las carpetas y contenidos del curso se cargarán aquí */}
              </div>
            </section>
            <section id="grades-section" style={{ display: "none" }}>
              <h2>Notas</h2>
              <div id="grades-content">{/* Las notas se cargarán aquí */}</div>
            </section>
            <section id="students-section" style={{ display: "none" }}>
              <h2>Alumnos</h2>
              <div id="students-content">{/* Los alumnos se cargarán aquí */}</div>
            </section>
            <section id="pending-section" style={{ display: "none" }}>
              <h2>Actividades Pendientes por Calificar</h2>
              <div id="pending-content">
                {/* Las actividades pendientes se cargarán aquí */}
              </div>
            </section>
          </div>
        </main>
      </>
      
    )
};

export default AulaVirtual;