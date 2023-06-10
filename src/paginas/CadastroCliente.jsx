import axios from "axios";
import Aside from "../layout/Aside";
import "./Cadastros.css";
import { useState, useEffect } from "react";

function CadastroCliente() {
    const [cliente, setCliente] = useState(null);
    const [clientes, setClientes] = useState([]);


    function getCliente() {
        axios.get("http://localhost:3020/cliente").then((resposta) => {
          setClientes(resposta.data);
        });
      }
    
      useEffect(() => {
        getCliente();
      }, []);

      function novoCliente() {
        setCliente({
            Nome: "",
            Endereco:"",
            Telefone:"",
            Email: "",
            locacoes: []
        });
      }
    

  function alterarCliente(campo, valor, _id) {
    cliente[campo] = valor
    setCliente({
      _id: _id,
      ...cliente
    });
  }

  function excluirCliente(id) {
    axios.delete("http://localhost:3020/cliente/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarCliente() {
    if (cliente._id) {
      axios.put("http://localhost:3020/cliente/" + cliente._id, cliente).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3020/cliente", cliente).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setCliente(null);
    getCliente();
  }

  function getFormulario() {
    return (
      <form>
            <label>Nome</label>
            <input type="text" 
                name="Nome"
                value={cliente.Nome}
                onChange={(e) => {
                    alterarCliente(e.target.name, e.target.value, cliente._id)
                }}
            />
            <label>Endereço</label>
            <input type="text"
                name="Endereco"
                value={cliente.Endereco}
                onChange={(e) => {
                    alterarCliente(e.target.name, e.target.value, cliente._id)
                }} 
            />
            <label>Telefone</label>
            <input type="text" 
                   name="Telefone"
                   value={cliente.Telefone}
                   onChange={(e) => {
                    alterarCliente(e.target.name, e.target.value, cliente._id)
                }} 
            />
            <label>Email</label>
            <input type="text" 
                   name="Email"
                   value={cliente.Email}
                   onChange={(e) => {
                    alterarCliente(e.target.name, e.target.value, cliente._id)
                   }}
            />

        <button
          type="button"
          class="btn btn-success"
          onClick={() => {
            salvarCliente();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            setCliente(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  function getLinhaDaTabela(cliente) {
    return (
      <tr key={cliente._id}>
        <td>{cliente._id}</td>
        <td>{cliente.Nome}</td>
        <td>{cliente.Endereco}</td>
        <td>{cliente.Telefone}</td>
        <td>{cliente.Email}</td>
        <td>{cliente.locacoes._id}</td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão do cliente " + cliente.Nome + "?"
                )
              ) {
                excluirCliente(cliente._id);
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </button>
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => {
              setCliente(cliente);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    const linhasDaTabela = [];
    for (let i = 0; i < clientes.length; i++) {
      const cliente = clientes[i];
      linhasDaTabela[i] = getLinhaDaTabela(cliente);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table class="table table-bordered table-dark">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }



  function getConteudo() {
    if (cliente == null) {
      return (
        <>
          <button
            type="button"
            class="btn btn-success"
            onClick={() => {
              novoCliente();
            }}
          >
            Novo Cliente
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }
  return (
    <div className="cadastros">
      <Aside />
      <div className="conteudo">
        <h2>Cadastro de Cliente</h2>
        {getConteudo()}
      </div>
    </div>
  );
  }
  
  export default CadastroCliente;