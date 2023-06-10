import axios from "axios";
import Aside from "../layout/Aside";
import "./Cadastros.css";
import { useState, useEffect } from "react";

function Pagamento() {
  const [pagamento, setPagamento] = useState(null);
    const [pagamentos, setPagamentos] = useState([]);


    function getPagamento() {
        axios.get("http://localhost:3020/pagamento").then((resposta) => {
          setPagamentos(resposta.data);
        });
      }
    
      useEffect(() => {
        getPagamento();
      }, []);

      function novoPagamento() {
        setPagamento({
          TipoPagamento: "",
          ValorPago:"",
        });
      }
    

  function alterarPagamento(campo, valor, _id) {
    pagamento[campo] = valor
    setPagamento({
        _id: _id,
      ...pagamento,
    });
  }

  function excluirPagamento(id) {
    axios.delete("http://localhost:3020/pagamento/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarPagamento() {
    if (pagamento._id) {
      axios.put("http://localhost:3020/pagamento/" + pagamento._id, pagamento).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3020/pagamento", pagamento).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setPagamento(null);
    getPagamento();
  }

  function getFormulario() {
    return (
      <form>
            <label>TipoPagamento</label>
            <input type="text" 
                name="TipoPagamento"
                value={pagamento.TipoPagamento}
                onChange={(e) => {
                    alterarPagamento(e.target.name, e.target.value, pagamento._id)
                }}
            />
            <label>Valor </label>
            <input type="text"
                name="ValorPago"
                value={pagamento.ValorPago}
                onChange={(e) => {
                    alterarPagamento(e.target.name, e.target.value, pagamento._id)
                }} 
            />
            
        <button
          type="button"
          class="btn btn-success"
          onClick={() => {
            salvarPagamento();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            setPagamento(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  function getLinhaDaTabela(pagamento) {
    return (
      <tr key={pagamento._id}>
        <td>{pagamento._id}</td>
        <td>{pagamento.TipoPagamento}</td>
        <td>{pagamento.ValorPago}</td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da área " + pagamento._id + "?"
                )
              ) {
                excluirPagamento(pagamento._id);
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
              setPagamento(pagamento);
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
    for (let i = 0; i < pagamentos.length; i++) {
      const pagamento = pagamentos[i];
      linhasDaTabela[i] = getLinhaDaTabela(pagamento);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table class="table table-bordered table-dark">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Tipo Pagamento</th>
            <th>Valor Pago</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (pagamento == null) {
      return (
        <>
          <button
            type="button"
            class="btn btn-success"
            onClick={() => {
              novoPagamento();
            }}
          >
            Novo pagamento
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
        <h2>Cadastro de Pagamento</h2>
        {getConteudo()}
      </div>
    </div>
  );

  }
  export default Pagamento;