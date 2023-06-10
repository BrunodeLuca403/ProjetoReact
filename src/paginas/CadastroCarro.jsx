import axios from "axios";
import Aside from "../layout/Aside";
import "./Cadastros.css";
import { useState, useEffect } from "react";

function CadastroCarro() {
    
    const [carro, setCarro] = useState(null);
    const [carros, setCarros] = useState([]);


    function getCarros() {
        axios.get("http://localhost:3020/carro").then((resposta) => {
          setCarros(resposta.data);
        });
      }
    
      useEffect(() => {
        getCarros();
      }, []);

      function novoCarro() {
        setCarro({
            Marca: "",
            Modelo:"",
            Ano:"",
            Tipo: "",
            Cor: "",
            Disponivel: "",
        });
      }
    

  function alterarCarro(campo, valor, _id) {
    carro[campo] = valor
    setCarro({
        _id: _id,
      ...carro
    });

  }

  function excluirCarro(id) {
    axios.delete("http://localhost:3020/carro/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarCarro() {
    if (carro._id) {
      axios.put("http://localhost:3020/carro/" + carro._id, carro).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3020/carro", carro).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setCarro(null);
    getCarros();
  }

  function getFormulario() {
    return (
      <form>
            <label>Marca</label>
            <input type="text" 
                name="Marca"
                value={carro.Marca}
                onChange={(e) => {
                    alterarCarro(e.target.name, e.target.value, carro._id)
                }}
            />
            <label>Modelo</label>
            <input type="text"
                name="Modelo"
                value={carro.Modelo}
                onChange={(e) => {
                    alterarCarro(e.target.name, e.target.value, carro._id)
                }} 
            />
            <label>Ano</label>
            <input type="text" 
                   name="Ano"
                   value={carro.Ano}
                   onChange={(e) => {
                       alterarCarro(e.target.name, e.target.value, carro._id)
                   }}
            />
            <label>tipo</label>
            <input type="text" 
                   name="Tipo"
                   value={carro.Tipo}
                   onChange={(e) => {
                       alterarCarro(e.target.name, e.target.value, carro._id)
                   }}
            />
            <label>cor</label>
            <input type="text" 
                   name="Cor"
                   value={carro.Cor}
                   onChange={(e) => {
                       alterarCarro(e.target.name, e.target.value, carro._id)
                   }}
            />
            <label>disponivel</label>
            <input type="text" 
                   name="Disponivel"
                   value={carro.Disponivel}
                   onChange={(e) => {
                       alterarCarro(e.target.name, e.target.value, carro._id)
                   }}
            />
        <button
          type="button"
          class="btn btn-success"
          onClick={() => {
            salvarCarro();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            setCarro(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  function getLinhaDaTabela(carro) {
    return (
      <tr key={carro._id}>
        <td>{carro._id}</td>
        <td>{carro.Marca}</td>
        <td>{carro.Modelo}</td>
        <td>{carro.Ano}</td>
        <td>{carro.Tipo}</td>
        <td>{carro.Cor}</td>
        <td>{carro.Disponivel}</td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão do veículo " + carro.Marca + " " + carro.Modelo + "?"
                )
              ) {
                excluirCarro(carro._id);
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
              setCarro(carro);
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
    for (let i = 0; i < carros.length; i++) {
      const carro = carros[i];
      linhasDaTabela[i] = getLinhaDaTabela(carro);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table class="table table-dark table-hover">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Tipo</th>
            <th>Cor</th>
            <th>Disponivel</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (carro == null) {
      return (
        <>
          <button
            type="button"
            class="btn btn-success"
            onClick={() => {
              novoCarro();
            }}
          >
            Novo carro
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
        <h2>Cadastro de Carros</h2>
        {getConteudo()}
      </div>
    </div>
  );

}
  export default CadastroCarro;