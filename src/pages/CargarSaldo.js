import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/Header';
import BodyComponent from '../components/Body';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const CargarSaldo = () => {
    const [monto, setSaldo] = useState(0);

    const usuario = useSelector((state) => state.usuario);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/cargar-saldo`, { documento: usuario.documento, celular: usuario.celular, monto: parseInt(monto) })
            Swal.fire({
                title: "Saldo actualizado?",
                showDenyButton: true,
                confirmButtonText: "Seguir recargando!",
                denyButtonText: `ir a Dashboard`
            }).then((result) => {
                if(result.isDenied) {
                    navigate(`/dashboard`);
                }
            });

        } catch (error) {
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
            <HeaderComponent link="/dashboard" title="< Dashboard" name={usuario.nombres}/>
            <div className="flex items-center justify-center flex-grow">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Cargar Saldo</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Saldo</label>
                            <input
                                type="number"
                                name="saldo"
                                value={monto}
                                onChange={(e) => setSaldo(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                        >
                            Recargar
                        </button>
                    </form>
                </div>
            </div>
        </BodyComponent>
    );
};

export default CargarSaldo;