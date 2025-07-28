
import Style from "./rol.module.css";


function Rol(){

    return(
        <div className={`${Style.container} ${Style.radio_inputs}`}>
        
        <form id="role-form">
        <div>
          <h1 className={Style.H1_input}> Elige tu rol <strong>Daniel </strong></h1>
        </div>
            <div className={Style.role_selection}>
                <div className={Style.Rt}>
                    <label>
                        <img src="src\assets\imgRol\RolT.png" alt="Profesor" id="profesor" />
                        <div className={Style.inputsRol}>
    
                <input className={Style.radio_input} type="radio" name="engine" />
                    <span className={Style.radio_tile}>
                        <span className={Style.radio_icon}>
                        <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            fillRule="evenodd"
                            d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </span>
                        <span className={Style.radio_label}>Profesor</span>
          </span>
                        </div>
                    </label>
                </div>
                <div className={Style.Rt}>
                    <label>
                        <img src="src\assets\imgRol\RolE.png" alt="Estudiante" id="estudiante" />
                        <div className={Style.inputsRol}>
                            <input
                            defaultChecked=""
                            className={Style.radio_input}
                            type="radio"
                            name="engine"
                          />
                          <span className={Style.radio_tile}>
                            <span className={Style.radio_icon}>
                              <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                                  clipRule="evenodd"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.35 0 .687.06 1 .17V5a2 2 0 0 0-2-2H5Zm4 10H3v2a2 2 0 0 0 2 2h4v-4Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className={Style.radio_label}>Estudiante</span>
                          </span>

                        </div>
                    </label>
                </div>
            </div>
            
            <button class={Style.cta} type="submit">
            <span>Confirmar</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
            </button>
        </form>

    </div>

    )

};

export default Rol;