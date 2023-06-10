import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './paginas/Home';
import CadastroCarro from './paginas/CadastroCarro'
import CadastroCliente from './paginas/CadastroCliente';
import Locacao from './paginas/Locacao'
import Pagamento from './paginas/Pagamento'

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout><Home/></Layout>} />
          <Route path='/cadastrosCarros' element={<Layout><CadastroCarro/></Layout>} />   
          <Route path='/cadastrosClientes' element={<Layout><CadastroCliente/></Layout>} />        
          <Route path='/locacao' element={<Layout><Locacao/></Layout>} />        
          <Route path='/pagamento' element={<Layout><Pagamento/></Layout>} />
      </Routes>     
    </>
  );
}
export default App;
