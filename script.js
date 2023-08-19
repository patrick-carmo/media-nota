document.addEventListener('DOMContentLoaded', function () {
  //layout
  const tituloInicial = document.querySelector('.titulo-inicial')
  const ocultar = document.querySelector('.main-none')
  let erro = document.querySelectorAll('.erro')
  let erros = document.querySelectorAll('.erro')
  const form = document.querySelector('.form')
  const notaInsuficiente = document.querySelector('.notaInsuficiente')
  const erroNota = document.querySelector('.erro-nota')
  const media = document.querySelector('.media')
  let textoMedia = document.querySelector('.media p')

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
  const resetar = document.querySelector('.resetar')

  let competencia = []
  let competenciaFinal = 0
  let contador = 0
  let controle = false
  let contadorInput = 1
  // parseFloat(textoMedia.textContent = `${competenciaFinal}`)

  function exibirMedia() {
    competenciaFinal = competencia[0] + competencia[1]
    media.style.display = 'flex'
    textoMedia.textContent = `${competenciaFinal}`
    console.log(competenciaFinal)
    reiniciar()
    return
  }


  resetar.addEventListener('click', function(){
    reiniciar()
    for (let i = 1; i <= 2; i++) {
      document.querySelector(
        `label[for=relatorio${i}]`
      ).textContent = `Relatório ${i}`
      document.querySelector(
        `label[for=questionario${i}]`
      ).textContent = `Questionário ${i}`
    }
  })
  enviarRecuperacao.addEventListener('click', function () {
    const valorRecuperacao = parseFloat(recuperacao.value)
    if (!isNaN(valorRecuperacao) && valorRecuperacao !== '') {
      if (valorRecuperacao >= 0 && valorRecuperacao <= 7) {
        console.log('contador dentro do enviar: ' + contador)
        competencia[contador] += valorRecuperacao
        console.log(competencia[contador])
        erroNota.style.display = 'none'
        ocultar.style.display = 'grid'
        notaInsuficiente.style.display = 'none'
        contador++
        if (contador > 1) {
          exibirMedia()
          return
        }
      } else {
        erroNota.style.display = 'block'
      }
    } else {
      erroNota.style.display = 'block'
    }
  })

  iniciar.addEventListener('click', function () {
    tituloInicial.style.display = 'none'
    ocultar.style.display = 'grid'
  })

  function label() {
    document.querySelector('label[for=relatorio1]').textContent = `Relatório ${
      contadorInput * 2 + 1
    }`

    document.querySelector('label[for=relatorio2]').textContent = `Relatório ${
      contadorInput * 2 + 2
    }`

    document.querySelector(
      'label[for=questionario1]'
    ).textContent = `Questionário ${contadorInput * 2 + 1}`

    document.querySelector(
      'label[for=questionario2]'
    ).textContent = `Questionário ${contadorInput * 2 + 2}`
  }

  calcular.addEventListener('click', function (e) {
    e.preventDefault()

    desabilitarInput.forEach((elemento) => {
      const valor = parseFloat(elemento.value.trim())

      if (
        isNaN(valor) ||
        valor === '' ||
        ((elemento === relatorio1 || elemento === relatorio2) &&
          (valor < 0 || valor > 7)) ||
        ((elemento === questionario1 || elemento === questionario2) &&
          (valor < 0 || valor > 5.5))
      ) {
        erros = elemento.nextElementSibling
        erros.style.display = 'inline-block'
        elemento.style.borderColor = 'red'
        controle = true
      } else {
        erros = elemento.nextElementSibling
        erros.style.display = 'none'
        elemento.style.borderColor = ''
      }
    })

    //verificador se há erros ainda, para não continuar a função

    //Caso não tenha mais erros, volta o valor original do controle e recomeça a verificação
    if (controle) {
      erros.style.display = 'none'
      controle = false
      return
    }

    label()

    contadorInput++

    competencia[contador] =
      parseFloat(relatorio1.value) +
      parseFloat(relatorio2.value) +
      parseFloat(questionario1.value) +
      parseFloat(questionario2.value)

    console.log(`competencia ${contador}: ${competencia[contador]}`)

    if (competencia[contador] < 17.5) {
      ocultar.style.display = 'none'
      notaInsuficiente.style.display = 'grid'
      return
    }

    if (contador >= 1) {
      for (let i = 1; i <= 2; i++) {
        document.querySelector(
          `label[for=relatorio${i}]`
        ).textContent = `Relatório ${i}`
        document.querySelector(
          `label[for=questionario${i}]`
        ).textContent = `Questionário ${i}`
      }
      exibirMedia()
      return
    }
    console.log('Contador: ' + contador)
    // ocultar.style.display = 'none'
    return contador++
    // }
  })

  form.addEventListener('reset', function (e) {
    e.preventDefault()

    erro.forEach((elemento) => (elemento.style.display = ''))
    desabilitarInput.forEach((elemento) => {
      elemento.style.borderColor = ''
      elemento.value = ''
    })
  })


  function reiniciar() {
    competencia.length = 0
    competenciaFinal = 0
    contador = 0
    controle = false
    contadorInput = 1
    desabilitarInput.forEach(elemento => elemento.value = '')
    return
  }
})
