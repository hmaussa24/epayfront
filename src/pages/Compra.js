import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BodyComponent from '../components/Body';
import HeaderComponent from '../components/Header';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NuevaCompra = () => {
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');
  const usuario = useSelector((state) => state.usuario);
  const navigate = useNavigate();

  const handleRegistrarCompra = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/comprar`, { usuarioId: usuario.id, descripcion, valor: parseInt(valor) })
      navigate(`/validar`);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal, intenta de nuevo!",
        footer: error.response.data.message
      });
    }
  };

  return (
    <BodyComponent>
      <HeaderComponent title={"< Dashboard"} link={"/dashboard"} name={usuario.nombres}/>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrar Nueva Compra</h2>
          <form onSubmit={handleRegistrarCompra} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Registrar Compra
            </button>
          </form>
        </div>
      </div>
    </BodyComponent>
  );
};

export default NuevaCompra;