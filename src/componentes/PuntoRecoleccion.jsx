import React from 'react';

function PuntoRecoleccion(props) {
    const { direccion, tipode_punto, estado, observaciones_adicionales } = props;

    // Función para determinar la clase CSS del estado
    const getEstadoClass = (estado) => {
        const estadoLower = estado.toLowerCase();
        if (estadoLower.includes('operativo') || estadoLower.includes('activo')) {
            return 'estado-operativo';
        } else if (estadoLower.includes('dañado') || estadoLower.includes('reparación')) {
            return 'estado-dañado';
        } else if (estadoLower.includes('retirado')) {
            return 'estado-retirado';
        }
        return 'estado-operativo'; // default
    };

    return (
        <div>
            <h2 className="punto-direccion">{direccion}</h2>
            <h3 className="punto-tipo">{tipode_punto}</h3>
            <div className={`punto-estado ${getEstadoClass(estado)}`}>
                {estado}
            </div>
            <div className="punto-observaciones">
                {observaciones_adicionales}
            </div>
        </div>
    );
}

export default PuntoRecoleccion;