import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/Header';
import BodyComponent from '../components/Body';
import axios from 'axios';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const navigate = useNavigate();
  const [saldo, setSaldo] = useState(0);
  const [compras, setConpras] = useState([{id: 1, descripcion: "Carro", valor: 1000, fecha: "24-01-1989"}, {id: 1, descripcion: "Carro", valor: 1000, fecha: "24-01-1989"}]);

  const usuario = useSelector((state) => state.usuario);

  const consultarSaldo = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/consultar-saldo?documento=${usuario.documento}&celular=${usuario.celular}`)
      setSaldo(response.data.saldo)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal, no pudimos consultar tu saldo!",
        footer: error.response.data.message
      });
    }
  }, [usuario.celular, usuario.documento])

  useEffect(() => {
   consultarSaldo()
  }, [saldo, consultarSaldo]);


  const handleLink = (link) => {
    navigate(link); // Navegar a la página para registrar nueva compra
  };

  return (
    <BodyComponent>
      <HeaderComponent link={"/"} title={"Salir"} name={usuario.nombres} />
      <div className="container mx-auto p-4">

        {/* Sección de Saldo */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Saldo Disponible</h3>
          <p className="text-2xl font-bold text-green-600">${saldo ? saldo.toFixed(2) : '0.00'}</p>
          <div className="text-right">
            <button
              onClick={() => handleLink('/saldo')}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Recargar saldo
            </button>
          </div>
        </div>

        {/* Sección de Compras */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Historial de Compras</h3>
          {compras && compras.length > 0 ? (
            <ul className="space-y-2">
              {compras.map((compra) => (
                <li key={compra.id} className="border p-2 rounded-lg">
                  <p className="font-medium">Descripción: {compra.descripcion}</p>
                  <p>Valor: ${compra.valor.toFixed(2)}</p>
                  <p>Fecha: {new Date(compra.fecha).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay compras registradas.</p>
          )}
        </div>

        {/* Botón para registrar nueva compra */}
        <div className="text-right">
          <button
            onClick={() => handleLink('/nueva-compra')}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
          >
            Registrar Nueva Compra
          </button>
        </div>
      </div>
    </BodyComponent>
  );
};

export default Dashboard;