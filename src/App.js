import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentoIngreso from './pages/DocumentoIngreso';
import ClienteRegistro from './pages/ClienteRegistro';
import Dashboard from './pages/Dashboard';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import NuevaCompra from './pages/Compra';
import CargarSaldo from './pages/CargarSaldo';
import ValidarToken from './pages/ValidarToken';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<DocumentoIngreso />} />
            <Route path="/registro" element={<ClienteRegistro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/nueva-compra" element={<NuevaCompra />} />
            <Route path="/saldo" element={<CargarSaldo />} />
            <Route path="/validar" element={<ValidarToken />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
