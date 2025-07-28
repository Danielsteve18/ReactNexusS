import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  const handlehome = () => {
    navigate('/');  // Esta es la ruta correcta para tu componente
};
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>404 - Página no encontrada</h1>
        <p style={styles.message}>La página que estás buscando no existe.</p>
        <a onClick={handlehome} style={styles.link}>Volver a la página de inicio</a>
      </div>
    );
  };
  
  const styles = {
    container: {
      textAlign: "center",
      padding: "50px",
      backgroundColor: "#f4f4f9",
      borderRadius: "8px",
      marginTop: "200px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "36px",
      color: "#333",
    },
    message: {
      fontSize: "18px",
      color: "#666",
      margin: "20px 0",
    },
    link: {
      fontSize: "16px",
      color: "#007BFF",
      textDecoration: "none",
    },
  };
  
  export default NotFound;