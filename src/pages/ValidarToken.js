import React, { useState } from 'react';
import BodyComponent from '../components/Body';
import HeaderComponent from '../components/Header';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ValidarToken = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState({ token: '', sessionId: '' });
  const usuario = useSelector((state) => state.usuario);
  const sessionId = useSelector((state) => state.dataCompra.validate)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ token: '', sessionId: '' });
    console.log(sessionId)
    let isValid = true;
    if (token.trim() === '' || token.length !== 6) {
      setError((prev) => ({
        ...prev,
        token: 'El token debe tener 6 dígitos.',
      }));
      isValid = false;
    }

    if (isValid) {

      try {
        const response = await axios.post(`http://localhost:3001/api/validar-token`, { sessionId, token })
        Swal.fire({
          title: response.data.mensaje,
          text: response.data.motivo,
          showCancelButton: true,
          confirmButtonText: 'ok!',
          denyButtonText: `salir`
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard')
          }
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error validando el token!!",
        });
      }

    }
  };

  return (
    <BodyComponent>
      <HeaderComponent title={"< Dashboard"} link={"/dashboard"} name={usuario.nombres} />
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Validar Compra</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ingresa el token de 6 dígitos enviado al correo</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                maxLength="6"
                className={`w-full px-3 py-2 border ${error.token ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
              {error.token && <p className="text-red-500 text-sm mt-1">{error.token}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Validar
            </button>
          </form>
        </div>
      </div>
    </BodyComponent>
  );
};

export default ValidarToken;