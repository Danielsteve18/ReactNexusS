import { useState } from "react";
import Style from "./meta.module.css";

// Componente de prueba para nuevos componentes y funcionalidades
function Meta() {
    const [count, setCount] = useState(0);

    return (
        <div className={Style.container}>
            <div className={Style.content}>
                <h1>Página de Prueba - Meta</h1>
                <p>Esta es una página de desarrollo para probar nuevos componentes.</p>
                
                <div className={Style.testSection}>
                    <h2>Contador de prueba</h2>
                    <p>Contador: {count}</p>
                    <button onClick={() => setCount(count + 1)}>
                        Incrementar
                    </button>
                    <button onClick={() => setCount(0)}>
                        Reiniciar
                    </button>
                </div>

                <div className={Style.info}>
                    <h3>Información</h3>
                    <p>Puedes usar esta página para probar nuevos componentes antes de integrarlos en el proyecto principal.</p>
                </div>
            </div>
        </div>
    );
}

export default Meta;
