import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [result, setResult] = useState<string>("")// Constate para armazenar o resultado

  // Função para adicionar valores ao resultado
  function add(valor: string) {
    setResult(result + valor)
  }
  // Função para calcular o resultado
  function calculate() {
    const expression = result // Substituir os símbolos de multiplicação e divisão por operadores matemáticos 
      .replace('x', '*') // Substituir o símbolo de multiplicação por *
      .replace('÷', '/') // Substituir o símbolo de divisão por /


    // Validações feitas com regex antes de calcular
    // Se estiver vazia retorna erro
    if (expression.trim() === "") { // trim() remove espaços em branco no início e no fim
      setResult("Erro")
      return
    }

    // Se começar ou terminar com operador retorna erro
    if (/^[+\-*/]/.test(expression) || /[+\-*/]$/.test(expression)) {// ^ indica o início da string, $ indica o fim da string
      setResult("Erro")
    }

    // Se tiver dois operadores seguidos retorna erro
    if (/[*+\-/]{2}/.test(expression)) {
      setResult("Erro")
      return
    }

    if (/\/0/.test(expression)) {// Verifica divisão por zero
      setResult("Erro")
      return
    }

    const res = eval(expression) // Avalia a expressão matemática usando eval e calcula o resultado

    setResult(String(res)) // Atualiza o estado com o resultado convertido para string

  }

  // Função para apagar o último caractere
  function apagarUltimo() {
    setResult((prev) => prev.slice(0, -1));
  }

  // Função para limpar o campo do resultado
  function clear() {
    setResult("")
  }

  return (
    <div className='App'>
      <div className='calculator'>
        <div className='result'>{result || "0"}</div>   
        <ul >                                            {/* Esboço das teclas da calculadora */}
          {/* Layout da calculadora */}                  {/* <li>C</li> <li> </li> <li>⌫</li> <li>÷</li> */}  
          {/* Linha um */}                               {/* <li>7</li> <li>8</li> <li>9</li>  <li>+</li> */}
          <li onClick={clear}>C</li>                     {/* <li>4</li> <li>5</li> <li>6</li>  <li>-</li> */}
          <li></li>                                      {/* <li>1</li> <li>2</li> <li>3</li>  <li>x</li> */}  
          <li onClick={apagarUltimo}>⌫</li>             {/* <li> </li> <li>0</li> <li> </li>  <li> </li> */} 
          <li onClick={() => add("÷")}>÷</li>           
                                                       
          {/* Linha dois */}                              
          <li onClick={() => add("7")}>7</li>               
          <li onClick={() => add("8")}>8</li>               
          <li onClick={() => add("9")}>9</li>
          <li onClick={() => add("+")}>+</li>

          {/* Linha três */}
          <li onClick={() => add("4")}>4</li>
           <li onClick={() => add("5")}>5</li> 
           <li onClick={() => add("6")}>6</li> 
           <li onClick={() => add("-")}>-</li>
          
          {/* Linha quatro */}
          <li onClick={() => add("1")}>1</li> 
          <li onClick={() => add("2")}>2</li> 
          <li onClick={() => add("3")}>3</li> 
          <li onClick={() => add("x")}>x</li>

          {/* Linha cinco */}
          <li></li> 
          <li onClick={() => add("0")}>0</li> 
          <li></li> 
          <li onClick={calculate}>=</li>
        </ul>
      </div>


    </div>
  )
}

export default App
