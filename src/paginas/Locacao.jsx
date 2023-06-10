import axios from "axios";
import Aside from "../layout/Aside";
import "./Cadastros.css";
import { useState, useEffect } from "react";
import Select from "react-select";

const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    margin: 0,
    padding: "5px 0",
    borderRadius: 3,
    borderColor: "gray",
    boxShadow: state.isFocused ? "0 0 0 2px black" : 0,
    ":hover": { borderColor: "black" },
  }),
};

function Locacao() {
    const [locacao, setLocacao] = useState(null);
    const [locacoes, setLocacoes] = useState([]);
    const [cliente, setClientes] = useState([]);
    const [clientesSelecionados, setClienteSelecionado] = useState();
    const [carros, setCarros] = useState([]);
    const [carrosSelecionados, setCarrosSelecionado] = useState();

    function getLocacao() {
      axios.get("http://localhost:3020/locacao").then((resposta) => {
        setLocacoes(resposta.data);
      });
    }
    
  function getCliente() {
    axios.get("http://localhost:3020/cliente").then((resposta) => {
      setClientes(resposta.data);
    });
  }

  function getCarros() {
    axios.get("http://localhost:3020/carro").then((resposta) => {
      setCarros(resposta.data);
    });
  }
    
      useEffect(() => {
        getLocacao();
        getCarros();
        getCliente();
      }, []);

      function novaLocacao() {
        setLocacao({
            DataFim: "",
            KmInicial:"",
            KmFinal:"",
            ValorDiaria: "",
            ValorkMExtra: "",
            ValorTotal: "",
            DataInicio: Date.now,
            cliente: [],
            carro: []
        });
      }
    

  function alterarLocacao(campo, valor, _id) {
    locacao[campo] = valor
    setLocacao({
      _id: _id,
      ...locacao
    });
  }

  function excluirLocacao(id) {
    axios.delete("http://localhost:3020/locacao/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarLocacao() {
    if (locacao._id) {
      axios.put("http://localhost:3020/locacao/" + locacao._id, locacao).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3020/locacao", locacao).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setLocacao(null);
    getLocacao();
    getCliente();
    setClienteSelecionado();
    getCarros();
  }

  function getFormulario() {
    return (
      <form>
            <label>Data Final</label>
            <input type="text" 
                name="DataFim"
                value={locacao.DataFim}
                onChange={(e) => {
                    alterarLocacao(e.target.name, e.target.value, locacao._id)
                }}
            />
            <label>Km Inicial</label>
            <input type="text"
                name="KmInicial"
                value={locacao.KmInicial}
                onChange={(e) => {
                    alterarLocacao(e.target.name, e.target.value, locacao._id)
                }} 
            />
            <label>Km Final</label>
            <input type="text" 
                   name="KmFinal"
                   value={locacao.KmFinal}
                   onChange={(e) => {
                    alterarLocacao(e.target.name, e.target.value, locacao._id)
                }} 
            />
            <label>Valor Diaria</label>
            <input type="text" 
                   name="ValorDiaria"
                   value={locacao.ValorDiaria}
                   onChange={(e) => {
                    alterarLocacao(e.target.name, e.target.value, locacao._id)
                   }}
            />

            <label>Valor Km Extra</label>
            <input type="text" 
                   name="ValorkMExtra"
                   value={locacao.ValorkMExtra}
                   onChange={(e) => {
                    alterarLocacao(e.target.name, e.target.value, locacao._id)
                   }}
            />

            <label>Valor Total</label>
            <input type="text" 
                   name="ValorTotal"
                   value={locacao.ValorTotal}
                   onChange={(e) => {
                    alterarLocacao(e.target.name, e.target.value, locacao._id)
                   }}
            />

            <label>Cliente</label>
              {getSelectClientes()}

            <label>Carros</label>
              {getSelectCarro()}


        <button
          type="button"
          class="btn btn-success"
          onClick={() => {
            salvarLocacao();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            setLocacao(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }


  function getSelectClientes() {
    const vetCliente = [];
    const clientesAnteriores = [];
  
    if (locacao && locacao.cliente) {
      for (let i = 0; i < cliente.length; i++) {
        const clientes = cliente[i];
        if (locacao.cliente.includes(cliente._id)) {
          clientesAnteriores[i] = {
            value: clientes._id,
            label: clientes.Nome,
          };
        }
        vetCliente[i] = {
          value: clientes._id,
          label: clientes.Nome,
        };
      }
    }
  
    return (
      <Select
        isMulti
        isClearable={false}
        value={clientesSelecionados}
        defaultValue={clientesAnteriores}
        onChange={onChangeSelectCliente}
        options={vetCliente}
        styles={selectStyles}
      />
    );
  }

  function onChangeSelectCliente(valores) {
    setClienteSelecionado(valores);
    const clienteids = [];
    for (let i = 0; i < valores.length; i++) {
      clienteids[i] = valores[i].value;
    }
    alterarLocacao("cliente", clienteids, locacao._id);
  }


  function getSelectCarro() {
    const vetCarro = [];
    const carrosAnteriores = [];
  
    if (locacao && locacao.carro) {
      for (let i = 0; i < carros.length; i++) {
        const carro = carros[i];
        if (locacao.carro.includes(carro._id)) {
          carrosAnteriores[i] = {
            value: carro._id,
            label: carro.Modelo,
          };
        }
        vetCarro[i] = {
          value: carro._id,
          label: carro.Modelo,
        };
      }
    }
  
    return (
      <Select
        isMulti
        isClearable={false}
        value={carrosSelecionados}
        defaultValue={carrosAnteriores}
        onChange={onChangeSelectCarro}
        options={vetCarro}
        styles={selectStyles}
      />
    );
  }

  function onChangeSelectCarro(valores) {
    setCarrosSelecionado(valores);
    const carroids = [];
    for (let i = 0; i < valores.length; i++) {
      carroids[i] = valores[i].value;
    }
    alterarLocacao("carro", carroids, locacao._id);
  }


  function getLinhaDaTabela(locacao) {
    return (
      <tr key={locacao._id}>
        <td>{locacao._id}</td>
        <td>{locacao.clientes}</td>
        <td>{locacao.carros}</td>
        <td>{locacao.DataInicio}</td>
        <td>{locacao.DataFim}</td>
        <td>{locacao.KmInicial}</td>
        <td>{locacao.KmFinal}</td>
        <td>{locacao.ValorDiaria}</td>   
        <td>{locacao.ValorkMExtra}</td>      
        <td>{locacao.ValorTotal}</td>      
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da área " + locacao._id + "?"
                )
              ) {
                excluirLocacao(locacao._id);
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
              setLocacao(locacao);
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
    for (let i = 0; i < locacoes.length; i++) {
      const locacao = locacoes[i];
      linhasDaTabela[i] = getLinhaDaTabela(locacao);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table class="table table-bordered table-dark">  
        <tbody>
          <tr>
            <th>Id</th>
            <th>Data Inicio</th>   
            <th>Data Fim</th>
            <th>Km Inicial</th>
            <th>Km Final</th>
            <th>Valor Diaria</th>
            <th>Valor Km Extra</th>
            <th>Valor Total</th>       
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (locacao == null) {
      return (
        <>
          <button
            type="button"
            class="btn btn-success"
            onClick={() => {
              novaLocacao();
            }}
          >
            Nova Locação
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
        <h2>Cadastrar Locação</h2>
        {getConteudo()}
      </div>
    </div>
  );
  }
  export default Locacao;