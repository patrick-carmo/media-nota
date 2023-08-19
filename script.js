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

  const competencia = []
  let competenciaFinal = 0
  let contador = 0
  let controle = false
  let contadorInput = 1
  // parseFloat(textoMedia.textContent = `${competenciaFinal}`)

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
        return  contador++
      } else {
        erroNota.style.display = 'block'
      }
    } else {
      erroNota.style.display = 'block'
      // return
    }
  })

  iniciar.addEventListener('click', function () {
    tituloInicial.style.display = 'none'
    ocultar.style.display = 'grid'
  })

  calcular.addEventListener('click', function (e) {
    e.preventDefault()

    desabilitarInput.forEach((elemento) => {
      const valor = parseFloat(elemento.value.trim())
      if (isNaN(valor) || valor === '') {
        erro = elemento.nextElementSibling
        erro.style.display = 'inline-block'
        erro2 = elemento.nextElementSibling
        elemento.style.borderColor = 'red'
        controle = true
      } else {
        erro = elemento.nextElementSibling
        erro.style.display = 'none'
        elemento.style.borderColor = ''
      }
    })

    //verificador se há erros ainda, para não continuar a função
    if (controle) {
      erro.style.display = 'none'
      controle = false
      return
    }

      document.querySelector(
        'label[for=relatorio1]'
      ).textContent = `Relatório ${contadorInput * 2 + 1}`

      document.querySelector(
        'label[for=relatorio2]'
      ).textContent = `Relatório ${contadorInput * 2 + 2}`

      document.querySelector(
        'label[for=questionario1]'
      ).textContent = `Questionário ${contadorInput * 2 + 1}`

      document.querySelector(
        'label[for=questionario2]'
      ).textContent = `Questionário ${contadorInput * 2 + 2}`

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

    if(contador >= 1){
      desabilitar()
      competenciaFinal = competencia[0]+competencia[1]
      media.style.display = 'flex'
      textoMedia.textContent = `${competenciaFinal}`
      console.log(competenciaFinal)
    }
    // desabilitar()
    console.log('Contador: ' + contador)
    // ocultar.style.display = 'none'
    return contador++
    // }
  })

  form.addEventListener('reset', function (e) {
    e.preventDefault()

    desabilitar()

    erros.forEach((erro) => {
      erro.style.display = 'none'
    })
  })

    function desabilitar() {
        desabilitarInput.forEach((elemento) => {
          if(elemento.disabled){
          elemento.style.borderColor = ''
          elemento.disabled = false
          calcular.disabled = false
          elemento.style.backgroundColor = ''
          calcular.style.backgroundColor = ''
          elemento.value = ''
          media.style.display = 'none'

        }else if(contador>=1){
          elemento.style.borderColor = 'green'
          elemento.disabled = true
          calcular.disabled = true
          elemento.style.backgroundColor = 'var(--cor-disabled-)'
          calcular.style.backgroundColor = 'var(--cor-disabled-)'
          media.style.display = 'flex'
        }
        })
  }

})