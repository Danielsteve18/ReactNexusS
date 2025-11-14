import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../../shared/shared.module.css";
import { Barra_Left } from "../../../../../components/indexC";
import { getCursosByProfesor, updateCurso } from "../../../../../firebase/services/cursos";
import { profesorMenuItems } from '../../../../../utils/menuItems';

function A_virtual() {
    const navigate = useNavigate();
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [linkForm, setLinkForm] = useState({
        titulo: '',
        plataforma: 'meet',
        url: '',
        descripcion: '',
        horaClase: '',
        diasClase: ''
    });

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
        if (id) {
            loadCursos(id);
        }
    }, []);

    const loadCursos = async (id) => {
        setLoading(true);
        try {
            const result = await getCursosByProfesor(id);
            if (result.success) {
                setCursos(result.data);
            }
        } catch (error) {
            console.error("Error cargando cursos:", error);
        }
        setLoading(false);
    };

    const handleAgregarLink = (curso) => {
        setSelectedCurso(curso);
        setShowModal(true);
        // Cargar datos existentes si los hay
        if (curso.aulaVirtual) {
            setLinkForm(curso.aulaVirtual);
        } else {
            setLinkForm({
                titulo: '',
                plataforma: 'meet',
                url: '',
                descripcion: '',
                horaClase: '',
                diasClase: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!linkForm.url) {
            alert('Por favor ingresa la URL de la clase');
            return;
        }

        const result = await updateCurso(selectedCurso.id, {
            aulaVirtual: linkForm
        });

        if (result.success) {
            alert('Link de aula virtual guardado exitosamente');
            setShowModal(false);
            setSelectedCurso(null);
            loadCursos(userId);
        } else {
            alert('Error al guardar: ' + result.error);
        }
    };

    const getPlataformaIcon = (plataforma) => {
        switch(plataforma) {
            case 'meet':
                return '📹';
            case 'zoom':
                return '💻';
            case 'teams':
                return '👥';
            case 'classroom':
                return '📚';
            default:
                return '🔗';
        }
    };

    const getPlataformaColor = (plataforma) => {
        switch(plataforma) {
            case 'meet':
                return '#34A853';
            case 'zoom':
                return '#2D8CFF';
            case 'teams':
                return '#6264A7';
            case 'classroom':
                return '#0F9D58';
            default:
                return '#667eea';
        }
    };

    const getCategoriaColor = (categoria) => {
        const colores = {
            'programacion': '#667eea',
            'diseño': '#f093fb',
            'negocios': '#4facfe',
            'idiomas': '#43e97b',
            'ciencias': '#fa709a',
            'default': '#764ba2'
        };
        return colores[categoria?.toLowerCase()] || colores.default;
    };

    return (
        <div className={Style.container}>
            <Barra_Left items={profesorMenuItems || []} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <h1>Aula Virtual</h1>
                    <p>Gestiona los enlaces de clases virtuales para tus cursos</p>
                </div>

                <div className={Style.mainSection}>
                    <p>Contenido del aula virtual</p>
                </div>
            </div>
        </div>
    );
}

export default A_virtual;