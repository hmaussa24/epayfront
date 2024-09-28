import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/Header';
import BodyComponent from '../components/Body';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {setUser} from '../redux/slices/userSlice'

const DocumentoIngreso = () => {
  const [documento, setDocumento] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.get(`http://localhost:3001/api/user/${documento}`)
        dispatch(setUser(response.data))
        navigate(`/dashboard`);
    }catch(error) {
       console.log(error.response.data)
       setError(error.response.data.message)
    }
    
  };

  return (
    <BodyComponent>
      <HeaderComponent link="/registro" title="Registro de usuario"/>
      <div className="flex items-center justify-center flex-grow">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Ingresar Documento</h2>
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Documento</label>
              <input
                type="text"
                name="documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
      </BodyComponent>
  );
};

export default DocumentoIngreso;