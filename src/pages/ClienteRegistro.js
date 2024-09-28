import React, { useState } from 'react';
import HeaderComponent from '../components/Header';
import BodyComponent from '../components/Body';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClienteRegistro = () => {
  const [nombres, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`http://localhost:3001/api/user`, {nombres, documento, email, celular})
      Swal.fire({
        title: "Buen trabajo!",
        text: "Te has registrado correctamente!",
        icon: "success"
      });
      setNombre("")
      setDocumento("")
      setCelular("")
      setEmail("")
    }catch(error) {
       console.log(error.response.data)

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
      <HeaderComponent link="/" title="Iniciar Sesion" />
      <div className="flex items-center justify-center flex-grow">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombres}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Documento</label>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Celular</label>
            <input
              type="text"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
    </BodyComponent>
  );
};

export default ClienteRegistro;