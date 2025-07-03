import React from 'react';
import PuntoRecoleccion from "./PuntoRecoleccion";
import { useNavigate, Link } from "react-router-dom";
import './ListaPuntoRecoleccion.css';

function ListaPuntoRecoleccion({ puntos, setPuntos, eliminarPunto }) {
    const navigate = useNavigate();

    const handleCrearPunto = () => {
        navigate('/crear-punto');
    };

    return (
        <div className="lista-puntos-container">
            <div className="lista-puntos-header">
                <h1 className="lista-puntos-title">Puntos de Recolección de EMASEO EP</h1>
            </div>
            <nav className="lista-puntos-nav">
                <button className="btn-crear-punto" onClick={handleCrearPunto}>
                    ➕ Crear Punto de Recolección
                </button>
            </nav>
            
            {puntos.length === 0 ? (
                <div className="no-puntos">
                    <div className="no-puntos-icon">📭</div>
                    <div className="no-puntos-text">No hay puntos de recolección registrados</div>
                    <div className="no-puntos-subtitle">¡Crea el primer punto para comenzar!</div>
                </div>
            ) : (
                <div className="puntos-grid">
                    {puntos.map((punto) => (
                        <div key={punto.id} className="punto-card">
                            <div className="punto-info">
                                <PuntoRecoleccion
                                    direccion={punto.direccion}
                                    tipode_punto={punto.tipode_punto}
                                    estado={punto.estado}
                                    observaciones_adicionales={punto.observaciones_adicionales}
                                />
                            </div>
                            <div className="punto-actions">
                                <button 
                                    className="btn-action btn-editar"
                                    onClick={() => navigate(`/editar-punto/${punto.id}`)}
                                >
                                    ✏️ Editar
                                </button>
                                <button 
                                    className="btn-action btn-eliminar"
                                    onClick={() => eliminarPunto(punto.id)}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaPuntoRecoleccion;
