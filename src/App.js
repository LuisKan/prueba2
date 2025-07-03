import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ListaPuntoRecoleccion from './componentes/ListaPuntoRecoleccion';
import CrearPuntoRecoleccion from './componentes/CrearPuntoRecoleccion';
import EditarPuntoRecoleccion from './componentes/EditarPuntoRecoleccion';
import PuntoRecoleccion from './componentes/PuntoRecoleccion';


function App() {
  const [puntos, setPuntos] = useState([]);
  const [error, setError] = useState(null);

  const fetchPuntos = () => {
    axios.get('http://localhost:3005/puntos_recoleccion')
      .then(response => {
        setPuntos(response.data);
      })
      .catch(() => {
        setError('Error al cargar los puntos de recolección');
      });
  };

  useEffect(() => {
    fetchPuntos();
  }, []);

  const agregarPunto = (nuevoPunto) => {
    axios.post('http://localhost:3005/puntos_recoleccion', nuevoPunto)
      .then(response => {
        setPuntos([...puntos, response.data]);
      })
      .catch(() => {
        setError('Error al agregar el punto');
      });
  };

  const eliminarPunto = (id) => {
    axios.delete(`http://localhost:3005/puntos_recoleccion/${id}`)
      .then(() => {
        setPuntos(puntos.filter(punto => punto.id !== id));
      })
      .catch(() => {
        setError('Error al eliminar el punto');
      });
  };

  const actualizarPunto = (id, datosActualizados) => {
    axios.put(`http://localhost:3005/puntos_recoleccion/${id}`, datosActualizados)
      .then(response => {
        setPuntos(puntos.map(punto =>
          punto.id === id ? response.data : punto
        ));
        setError(null);
      })
      .catch(() => {
        setError('Error al actualizar el punto');
      });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListaPuntoRecoleccion puntos={puntos} eliminarPunto={eliminarPunto} />} />
          <Route path="/puntos" element={<ListaPuntoRecoleccion puntos={puntos} eliminarPunto={eliminarPunto} />} />
          
          
          <Route path="/crear-punto" element={<CrearPuntoRecoleccion agregarPunto={agregarPunto} />} />
          
          <Route path="/editar-punto/:id" element={<EditarPuntoRecoleccion actualizarPunto={actualizarPunto} />} />
        </Routes>
      </BrowserRouter>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  );
}

export default App;
