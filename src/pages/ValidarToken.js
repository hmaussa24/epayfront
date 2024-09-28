import React, { useState } from 'react';
import BodyComponent from '../components/Body';
import HeaderComponent from '../components/Header';
import { useSelector } from 'react-redux';

const ValidarToken = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState({ token: '', sessionId: '' });
  const usuario = useSelector((state) => state.usuario);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Resetear errores
    setError({ token: '', sessionId: '' });

    let isValid = true;
    if (token.trim() === '' || token.length !== 6) {
      setError((prev) => ({
        ...prev,
        token: 'El token debe tener 6 dígitos.',
      }));
      isValid = false;
    }

    if (isValid) {

      
    }
  };

  return (
    <BodyComponent>
    <HeaderComponent title={"< Dashboard"} link={"/dashboard"} name={usuario.nombres}/>
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
              className={`w-full px-3 py-2 border ${
                error.token ? 'border-red-500' : 'border-gray-300'
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