import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Barra_Left } from '../components/indexC';
import Style from '../Private/review/shared/shared.module.css';
import { getConvocatorias } from '../firebase/services/convocatorias';

const profesorItems = [
    { href: "/view-foro", content: "Foros" },
    { href: "/view-config", content: "Configuraciones" },
    { href: "/view-activity", content: "Actividad" },
    { href: "/view-convocatorias", content: "Convocatorias" },
    { href: "/clean-convocatorias", content: "Limpiar Datos" },
    { href: "/view-cursos", content: "Mis Cursos" },
    { href: "/view-aVirtual", content: "Aula Virtual" },
];

function CleanConvocatorias() {
    const [loading, setLoading] = useState(false);
    const [convocatorias, setConvocatorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'empty', 'valid'

    useEffect(() => {
        loadConvocatorias();
    }, []);

    const loadConvocatorias = async () => {
        setLoading(true);
        try {
            const result = await getConvocatorias();
            if (result.success) {
                setConvocatorias(result.data);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar convocatorias: ' + error.message);
        }
        setLoading(false);
    };

    const deleteConvocatoria = async (id, titulo) => {
        if (!window.confirm(`¿Eliminar la convocatoria "${titulo}"?`)) {
            return;
        }

        try {
            await deleteDoc(doc(db, 'convocatorias', id));
            alert('✅ Convocatoria eliminada');
            loadConvocatorias();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar: ' + error.message);
        }
    };

    const deleteAllEmpty = async () => {
        const emptyConvs = convocatorias.filter(conv => 
            !conv.titulo || !conv.descripcion || 
            conv.titulo.trim() === '' || 
            conv.descripcion.trim() === ''
        );

        if (emptyConvs.length === 0) {
            alert('No hay convocatorias vacías para eliminar');
            return;
        }

        if (!window.confirm(`¿Eliminar ${emptyConvs.length} convocatorias vacías?`)) {
            return;
        }

        setLoading(true);
        try {
            for (const conv of emptyConvs) {
                await deleteDoc(doc(db, 'convocatorias', conv.id));
            }
            alert(`✅ Se eliminaron ${emptyConvs.length} convocatorias vacías`);
            loadConvocatorias();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar: ' + error.message);
        }
        setLoading(false);
    };

    const isEmpty = (conv) => {
        return !conv.titulo || !conv.descripcion || 
               conv.titulo.trim() === '' || 
               conv.descripcion.trim() === '';
    };

    const filteredConvocatorias = convocatorias.filter(conv => {
        const matchesSearch = conv.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            conv.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            conv.profesorNombre?.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filterType === 'empty') {
            return matchesSearch && isEmpty(conv);
        } else if (filterType === 'valid') {
            return matchesSearch && !isEmpty(conv);
        }
        return matchesSearch;
    });

    const emptyCount = convocatorias.filter(isEmpty).length;
    const validCount = convocatorias.length - emptyCount;

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Sin fecha';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className={Style.container}>
            <Barra_Left items={profesorItems} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <h1>🧹 Gestión de Convocatorias</h1>
                    <p>Administra y elimina convocatorias individualmente o en lote</p>
                </div>

                {/* Estadísticas */}
                <div className={Style.statsGrid} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    marginBottom: '25px'
                }}>
                    <div className={Style.statCard} style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{convocatorias.length}</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total</div>
                    </div>
                    <div className={Style.statCard} style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{emptyCount}</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Vacías</div>
                    </div>
                    <div className={Style.statCard} style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{validCount}</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Válidas</div>
                    </div>
                </div>

                {/* Acciones y filtros */}
                <div className={Style.mainSection}>
                    <div style={{ 
                        display: 'flex', 
                        gap: '15px', 
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button 
                                className={Style.primaryBtn}
                                onClick={loadConvocatorias}
                                disabled={loading}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Actualizar
                            </button>
                            
                            {emptyCount > 0 && (
                                <button 
                                    className={Style.deleteBtn}
                                    onClick={deleteAllEmpty}
                                    disabled={loading}
                                    style={{ 
                                        background: '#ff4757',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '0.95rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    Eliminar {emptyCount} Vacías
                                </button>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => setFilterType('all')}
                                style={{
                                    padding: '8px 16px',
                                    background: filterType === 'all' ? '#667eea' : '#f0f0f0',
                                    color: filterType === 'all' ? 'white' : '#666',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setFilterType('empty')}
                                style={{
                                    padding: '8px 16px',
                                    background: filterType === 'empty' ? '#ff4757' : '#f0f0f0',
                                    color: filterType === 'empty' ? 'white' : '#666',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Vacías
                            </button>
                            <button
                                onClick={() => setFilterType('valid')}
                                style={{
                                    padding: '8px 16px',
                                    background: filterType === 'valid' ? '#2ecc71' : '#f0f0f0',
                                    color: filterType === 'valid' ? 'white' : '#666',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Válidas
                            </button>
                        </div>
                    </div>

                    {/* Buscador */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="🔍 Buscar por título, descripción o profesor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                    </div>

                    {/* Lista de convocatorias */}
                    {loading ? (
                        <div className={Style.loadingState}>
                            <div className={Style.spinner}></div>
                            <p>Cargando convocatorias...</p>
                        </div>
                    ) : filteredConvocatorias.length === 0 ? (
                        <div className={Style.emptyState}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>No se encontraron convocatorias</p>
                        </div>
                    ) : (
                        <div className={Style.convocatoriasGrid}>
                            {filteredConvocatorias.map((conv) => (
                                <div 
                                    key={conv.id} 
                                    className={Style.convocatoriaCard}
                                    style={{ 
                                        borderLeft: isEmpty(conv) ? '4px solid #ff4757' : '4px solid #2ecc71',
                                        position: 'relative'
                                    }}
                                >
                                    {isEmpty(conv) && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: '#ff4757',
                                            color: 'white',
                                            padding: '4px 10px',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            VACÍA
                                        </div>
                                    )}
                                    
                                    <h3>{conv.titulo || '(sin título)'}</h3>
                                    <p className={Style.descripcion}>
                                        {conv.descripcion ? 
                                            (conv.descripcion.substring(0, 100) + 
                                            (conv.descripcion.length > 100 ? '...' : '')) 
                                            : '(sin descripción)'}
                                    </p>
                                    
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: '15px',
                                        paddingTop: '15px',
                                        borderTop: '1px solid #f0f0f0',
                                        fontSize: '0.85rem',
                                        color: '#666'
                                    }}>
                                        <div>
                                            <div><strong>Tipo:</strong> {conv.tipo || 'general'}</div>
                                            <div><strong>Por:</strong> {conv.profesorNombre || 'Desconocido'}</div>
                                            <div><strong>Fecha:</strong> {formatDate(conv.createdAt)}</div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => deleteConvocatoria(conv.id, conv.titulo || 'sin título')}
                                            style={{
                                                background: '#ff4757',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CleanConvocatorias;
