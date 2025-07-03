import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './EditarPuntoRecoleccion.css';

const EditarPuntoRecoleccion = ({ actualizarPunto }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [punto, setPunto] = useState({
        direccion: "",
        tipode_punto: "",
        estado: "",
        observaciones_adicionales: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    const handleListaPuntos = () => {
        navigate("/puntos");
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3005/puntos_recoleccion/${id}`)
            .then((res) => {
                setPunto(res.data);
                setLoading(false);
                setError(null);
            })
            .catch(() => {
                setError("Error al cargar los datos del punto de recolección.");
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setPunto({ ...punto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actualizarPunto(id, punto);
        navigate("/puntos");
    };

    return (
        <div className="editar-punto-container">
            <div className="editar-punto-header">
                <h1 className="editar-punto-title">Editar Punto de Recolección</h1>
            </div>
            
            <nav className="editar-punto-nav">
                
                <button className="btn-nav btn-lista" onClick={handleListaPuntos}>
                    Lista de Puntos
                </button>
            </nav>

            {error && (
                <div className="mensaje-error">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="loading-indicator">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Cargando datos...</div>
                </div>
            ) : (
                <form className="editar-punto-form datos-cargados" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label label-direccion">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            className="form-input"
                            placeholder="Ingrese la dirección del punto de recolección"
                            value={punto.direccion}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label label-tipo">Tipo de Punto</label>
                        <select
                            name="tipode_punto"
                            className="form-select"
                            value={punto.tipode_punto}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione tipo de punto</option>
                            <option value="Contenedor">Contenedor</option>
                            <option value="Contenedor de basura">Contenedor de basura</option>
                            <option value="Punto Verde">Punto Verde</option>
                            <option value="Puntos de reciclaje">Puntos de reciclaje</option>
                            <option value="Puntos criticos">Puntos críticos</option>
                            <option value="Puntos especiales">Puntos especiales</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label label-estado">Estado</label>
                        <select
                            name="estado"
                            className="form-select"
                            value={punto.estado}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione estado</option>
                            <option value="Operativo">Operativo</option>
                            <option value="Activo">Activo</option>
                            <option value="En reparación">En reparación</option>
                            <option value="Dañado">Dañado</option>
                            <option value="Retirado">Retirado</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label label-observaciones">Observaciones Adicionales</label>
                        <textarea
                            name="observaciones_adicionales"
                            className="form-textarea"
                            placeholder="Ingrese observaciones adicionales sobre el punto de recolección"
                            value={punto.observaciones_adicionales}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-guardar">
                        Guardar Cambios
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditarPuntoRecoleccion;