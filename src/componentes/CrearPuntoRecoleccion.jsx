import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CrearPuntoRecoleccio.css';

function CrearPuntoRecoleccion({ agregarPunto }) {
   
    const [direccion, setDireccion] = useState('');
   
    const [tipode_punto, setTipodePunto] = useState('');
    const [estado, setEstado] = useState('');
    const [observaciones_adicionales, setObservacionesAdicionales] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!direccion || !tipode_punto || !estado || !observaciones_adicionales) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        const nuevoPunto = {
           
            direccion,
        
            tipode_punto,
            estado,
            observaciones_adicionales
        };
        agregarPunto(nuevoPunto);
        
        setDireccion('');
       
        setTipodePunto('');
        setEstado('');
        setObservacionesAdicionales('');
        navigate('/puntos');
    };

    const handleListaPuntos = () => {
        navigate('/puntos');
    };

    return (
        <div className="crear-punto-container">
            <div className="crear-punto-header">
                <h1 className="crear-punto-title">Crear Punto de Recolección</h1>
            </div>
            
            <nav className="crear-punto-nav">
                <button className="btn-lista-puntos" onClick={handleListaPuntos}>
                    Lista de Puntos
                </button>
            </nav>

            <form className="crear-punto-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label label-direccion">Dirección</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Ingrese la dirección del punto de recolección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label label-tipo">Tipo de Punto</label>
                    <select
                        className="form-select"
                        value={tipode_punto}
                        onChange={(e) => setTipodePunto(e.target.value)}
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
                        className="form-select"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
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
                        className="form-textarea"
                        placeholder="Ingrese observaciones adicionales sobre el punto de recolección"
                        value={observaciones_adicionales}
                        onChange={(e) => setObservacionesAdicionales(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    Agregar Punto
                </button>
            </form>
        </div>
    );
}

export default CrearPuntoRecoleccion;