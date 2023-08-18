document.addEventListener('DOMContentLoaded', function () {
  //layout
  const tituloInicial = document.querySelector('.titulo-inicial')
  const ocultar = document.querySelector('.main-none')
  let erro = document.querySelectorAll('.erro')
  let erro2 = document.querySelectorAll('.erro2')
  let erros = document.querySelectorAll('.erro')
  const form = document.querySelector('.form')
  const notaInsuficiente = document.querySelector('.notaInsuficiente')
  const erroNota = document.querySelector('.erro-nota')

  //botoes
  const iniciar = document.querySelector('.iniciar')
  const calcular = document.querySelector('.calcular')
  const enviar = document.querySelector('.enviar')
  const enviarRecuperacao = document.querySelector('.recuperacao')

  //input
  const relatorio1 = document.getElementById('relatorio1')
  const relatorio2 = document.getElementById('relatorio2')
  const questionario1 = document.getElementById('questionario1')
  const questionario2 = document.getElementById('questionario2')
  const recuperacao = document.getElementById('recuperacao')
  let desabilitarInput = document.querySelectorAll('.disabled')

  let notas = 0
  let competencia1 = 0
  let competencia2 = 0

  function calcularCompetencia(competencia){
    if (competencia === 1) {
      competencia1 =
        Number(relatorio1.value) +
        Number(relatorio2.value) +
        Number(questionario1.value) +
        Number(questionario2.value)
    } else {
      competencia1 =
        Number(relatorio1.value) +
        Number(relatorio2.value) +
        Number(questionario1.value) +
        Number(questionario2.value)
    }
  }

  iniciar.addEventListener('click', function () {
    tituloInicial.style.display = 'none'
    ocultar.style.display = 'grid'
  })

  function exibirRecuperacao(){
    notaInsuficiente.style.display = 'grid'
  }

  enviarRecuperacao.addEventListener('click', function () {
    if (!Number.isNaN(recuperacao.value)){
      if (recuperacao.value >= 0 && recuperacao.value <= 7) {
        notas += Number(recuperacao.value)
        console.log(notas)
        erroNota.style.display = 'none'
        ocultar.style.display = 'grid'
        notaInsuficiente.style.display = 'none'
        return
      } else {
        erroNota.style.display = 'block'
      }
    }else{
      erroNota.style.display = 'block'
    }
  })

  let contador = 1
  let controle = false

  form.addEventListener('reset', function (e) {
    e.preventDefault()

    desabilitarInput.forEach((elemento) => {
      elemento.style.borderColor = ''
      elemento.disabled = false
      elemento.style.backgroundColor = ''
      calcular.style.backgroundColor = ''
      elemento.value = ''
    })

    erros.forEach((erro) => {
      erro.style.display = 'none'
    })
  })

  calcular.addEventListener('click', function (e) {
    e.preventDefault()

    desabilitarInput.forEach((elemento) => {
      if (elemento.value.trim() === '') {
        erro = elemento.nextElementSibling
        erro.style.display = 'inline-block'
        erro2 = elemento.nextElementSibling
        elemento.style.borderColor = 'red'
        controle = true
      } else {
        erro = elemento.nextElementSibling
        erro.style.display = 'none'
      }
    })
    if (controle) {
      erro.style.display = 'none'
      controle = false
      return
    }

    if (contador === 1) {
      notas += Number(relatorio1.value) + Number(relatorio2.value) + Number(questionario1.value) + Number(questionario2.value)

      console.log("Notas 1: "+notas)

      if(notas<17.5){
        ocultar.style.display = 'none'
        exibirRecuperacao()
      }

      console.log(notas)
      desabilitarInput.forEach(elemento =>{
        elemento.value = ''
      })
    }

    contador++

    if (contador === 2) {
      notas = 0
      notas +=
        Number(relatorio1.value) +
        Number(relatorio2.value) +
        Number(questionario1.value) +
        Number(questionario2.value)
      console.log("notas 2: "+notas)
      document.querySelector(
        'label[for=relatorio1]'
      ).textContent = `Relatório ${contador + 1}`
      document.querySelector(
        'label[for=relatorio2]'
      ).textContent = `Relatório ${contador + 2}`
      console.log(`Notas: ` + notas)
      document.querySelector(
        'label[for=questionario1]'
      ).textContent = `Questionário ${contador + 2}`
      console.log(`Notas: ` + notas)
      document.querySelector(
        'label[for=questionario2]'
      ).textContent = `Questionário ${contador + 2}`
      console.log(`Notas: ` + notas)
      contador++
      return
    }
    if (contador > 1) {
      if (notas < 17.5) {
        exibirRecuperacao()
      }
      desabilitarInput.forEach((elemento) => {
        elemento.style.borderColor = 'green'
        elemento.disabled = true
        elemento.style.backgroundColor = 'var(--cor-disabled-)'
        calcular.style.backgroundColor = 'var(--cor-disabled-)'
      })
    }
  })
})
