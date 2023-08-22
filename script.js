document.addEventListener('DOMContentLoaded', function () {
  //layout
  const tituloInicial = document.querySelector('.titulo-inicial')
  const ocultar = document.querySelector('.main-none')
  let erro = document.querySelectorAll('.erro')
  let erros = document.querySelectorAll('.erro')
  let erroProjeto = document.querySelectorAll('.erro-projeto')
  let erroProva = document.querySelectorAll('.erro-prova')
  const form = document.querySelector('.form')
  const notaInsuficiente = document.querySelector('.notaInsuficiente')
  const erroNota = document.querySelector('.erro-nota')
  const media = document.querySelector('.media')
  const mediaTitulo = document.querySelector('.media h2')
  const mediaResultado = document.querySelector('.media-resultado')
  const formProjeto = document.querySelector('.form-projeto')
  const formProva = document.querySelector('.form-prova')
  const mediaAprovado = document.querySelector('.media-aprovado')
  const mediaReprovado = document.querySelector('.media-reprovado')
  const projeto = document.querySelector('.projeto')
  const prova = document.querySelector('.prova')
  const divProvaInt = document.querySelector('.div-prova-int')
  const divProvaSub = document.querySelector('.div-prova-sub')

  //botoes
  const iniciar = document.querySelector('.iniciar')
  const calcular = document.querySelector('.calcular')
  const enviarRecuperacao = document.querySelector('.recuperacao')
  const resetar = document.querySelector('.resetar')
  const limpar = document.querySelector('.limpar')
  const limparProjeto = document.querySelector('.limpar-projeto')
  const limparProva = document.querySelector('.limpar-prova')
  const prosseguir = document.querySelector('.prosseguir')
  const resetarMedia = document.querySelector('.resetar-media')

  //input
  const relatorio1 = document.getElementById('relatorio1')
  const relatorio2 = document.getElementById('relatorio2')
  const questionario1 = document.getElementById('questionario1')
  const questionario2 = document.getElementById('questionario2')
  const projeto1 = document.getElementById('projeto1')
  const projeto2 = document.getElementById('projeto2')
  const provaInt = document.getElementById('prova-int')
  const provaSub = document.getElementById('prova-sub')
  const apresentacao = document.getElementById('apresentacao')
  const recuperacao = document.getElementById('recuperacao')
  let desabilitarInput = document.querySelectorAll('.disabled')
  let inputProjetos = document.querySelectorAll('.input-projetos')
  let inputProva = document.querySelectorAll('.input-prova')

  let competencia = []
  let notaProjeto = 0
  let competenciaFinal = 0
  let contador = 0
  let contadorInput = 1
  let controleMedia = 0
  let controleProsseguir = 0
  let mediaFinal = 0
  let naRecuperacao = false

  function exibirMedia() {
    if (controleMedia === 0) {
      competenciaFinal = competencia[0] + competencia[1]
      media.style.display = 'flex'
      mediaResultado.textContent = `${competenciaFinal}`

      modificarInput(true)
      ocultarBotao(true)

      document.querySelector(
        `label[for=relatorio1]`
      ).textContent = `Relatório 3`
      document.querySelector(
        `label[for=questionario1]`
      ).textContent = `Questionário 3`
      document.querySelector(
        `label[for=relatorio2]`
      ).textContent = `Relatório 4`
      document.querySelector(
        `label[for=questionario2]`
      ).textContent = `Questionário 4`

      return
    } else if (controleMedia === 1) {
      media.style.display = 'flex'
      mediaTitulo.textContent = 'Nota do Projeto'
      mediaResultado.textContent = `${notaProjeto}`
      controleProsseguir++
    } else if (controleMedia === 2) {
      media.style.display = 'flex'
      mediaTitulo.textContent = 'Media Total'
      mediaResultado.textContent = `${mediaFinal}`
      mediaResultado.style.color = ''
      mediaResultado.style.textShadow = ''
      mediaAprovado.style.display = 'block'
      prosseguir.style.display = 'none'
      resetarMedia.style.display = 'block'
      controleProsseguir++
    } else if (controleMedia === 3) {
      media.style.display = 'flex'
      mediaTitulo.textContent = 'Media total'
      mediaResultado.style.color = '#B71C1C'
      mediaResultado.style.textShadow = '0px 0px 5px rgba(128, 128, 128, 0.5)'
      prosseguir.style.boxShadow = '0px 0px 30px rgba(128, 128, 128, 0.5)'
      prosseguir.style.backgroundColor = '#666666'
      prosseguir.textContent = 'Recuperação'
      mediaResultado.textContent = `${mediaFinal}`
      if (controleProsseguir === 3) {
        prosseguir.style.display = 'none'
        mediaReprovado.style.display = 'block'
        resetarMedia.style.display = 'block'
        resetarMedia.style.color = '#ffffff'
        resetarMedia.style.backgroundColor = '#666666'
        resetarMedia.style.boxShadow = '0px 0px 30px rgba(128, 128, 128, 0.5)'
      }
      controleProsseguir++
    }
  }

  prosseguir.addEventListener('click', function (e) {
    e.preventDefault()

    resetarMedia.addEventListener('click', function () {
      prosseguir.style.display = ''
      resetarMedia.style.display = ''
      reset()
      return
    })

    if (controleProsseguir === 0) {
      projeto.style.display = 'flex'
      media.style.display = ''
      ocultar.style.display = 'none'
    } else if (controleProsseguir === 1) {
      prova.style.display = 'flex'
      media.style.display = ''
    } else if (controleProsseguir === 2) {
      prova.style.display = 'flex'
      media.style.display = ''

      divProvaInt.style.display = 'none'
      divProvaSub.style.display = 'flex'
    } else {
    }
  })

  limparProjeto.addEventListener('click', function () {
    inputProjetos.forEach((elemento) => {
      elemento.value = ''
      elemento.style.borderColor = ''
      erroProjeto = elemento.nextElementSibling
      erroProjeto.style.display = 'none'
    })
  })

  limparProva.addEventListener('click', function () {
    inputProva.forEach((elemento) => {
      elemento.value = ''
      elemento.style.borderColor = ''
      erroProva = elemento.nextElementSibling
      erroProva.style.display = 'none'
    })
  })

  formProjeto.addEventListener('submit', function (e) {
    e.preventDefault()

    let controleProjeto = false

    inputProjetos.forEach((elemento) => {
      const valor = parseFloat(elemento.value.trim())
      if (
        isNaN(valor) ||
        valor === '' ||
        (elemento === projeto1 && (valor < 0 || valor > 10)) ||
        ((elemento === projeto2 || elemento === apresentacao) &&
          (valor < 0 || valor > 20))
      ) {
        erroProjeto = elemento.nextElementSibling
        erroProjeto.style.display = 'inline-block'
        elemento.style.borderColor = 'red'
        controleProjeto = true
        return
      } else {
        erroProjeto = elemento.nextElementSibling
        erroProjeto.style.display = ''
        elemento.style.borderColor = ''
      }
    })

    if (controleProjeto) {
      return
    }

    parseFloat(
      (notaProjeto =
        parseFloat(projeto1.value) +
        parseFloat(projeto2.value) +
        parseFloat(apresentacao.value))
    )
    controleMedia = 1
    projeto.style.display = ''
    exibirMedia()
  })

  formProva.addEventListener('submit', function (e) {
    e.preventDefault()

    if (!naRecuperacao) {
      let controleProva = false

      const valor = parseFloat(provaInt.value.trim())

      if (isNaN(valor) || valor === '' || valor < 0 || valor > 100) {
        erroProva[0].style.display = 'inline-block'
        erroProva[0].style.borderColor = 'red'
        controleProva = true
      } else {
        erroProva[0].style.display = ''
        erroProva[0].style.borderColor = ''
      }

      if (controleProva) {
        return
      }

      mediaFinal = (notaProjeto + competenciaFinal + valor) / 2

      prova.style.display = ''
      if (mediaFinal > 60) {
        controleMedia = 2
        exibirMedia()
      }
      if (mediaFinal < 60) {
        naRecuperacao = true
        controleMedia = 3
        exibirMedia()
      }
    } else {
      let controleProva = false

      const valor = parseFloat(provaSub.value.trim())

      if (isNaN(valor) || valor === '' || valor < 0 || valor > 100) {
        erroProva[1].style.display = 'inline-block'
        erroProva[1].style.borderColor = 'red'
        controleProva = true
      } else {
        erroProva[1].style.display = ''
        erroProva[1].style.borderColor = ''
      }

      if (controleProva) {
        return
      }

      mediaFinal = (notaProjeto + competenciaFinal + valor) / 2

      prova.style.display = ''
      controleProsseguir = 3
      if (mediaFinal > 60) {
        controleMedia = 2
        exibirMedia()
      } else {
        controleMedia = 3
        exibirMedia()
      }
    }
  })

  iniciar.addEventListener('click', function () {
    tituloInicial.style.display = 'none'
    ocultar.style.display = 'grid'
  })

  function modificarInput(controlador) {
    if (controlador) {
      desabilitarInput.forEach((elemento) => {
        elemento.disabled = true
        elemento.style.backgroundColor = 'var(--cor-disabled-)'
        elemento.style.borderColor = 'green'
      })
    } else {
      desabilitarInput.forEach((elemento) => {
        elemento.disabled = false
        elemento.value = ''
        elemento.style.borderColor = ''
        elemento.style.backgroundColor = ''
      })

      erro.forEach((elemento) => {
        elemento.style.display = 'none'
      })

      mediaResultado.textContent = '0'
    }
  }

  resetar.addEventListener('click', function () {
    reset()
    return
  })

  function reset() {
    reiniciar()
    label(false)
    return
  }

  enviarRecuperacao.addEventListener('click', function () {
    const valorRecuperacao = parseFloat(recuperacao.value)
    if (!isNaN(valorRecuperacao) && valorRecuperacao !== '') {
      if (valorRecuperacao >= 0 && valorRecuperacao <= 7) {
        competencia[contador] += valorRecuperacao
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

  function label(controlador) {
    if (controlador) {
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
    } else {
      for (let i = 1; i <= 2; i++) {
        document.querySelector(
          `label[for=relatorio${i}]`
        ).textContent = `Relatório ${i}`
        document.querySelector(
          `label[for=questionario${i}]`
        ).textContent = `Questionário ${i}`
      }
    }
  }

  calcular.addEventListener('click', function (e) {
    e.preventDefault()

    let controle = false

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

    if (controle) {
      erros.style.display = 'none'
      controle = false
      return
    }

    label(true)

    contadorInput++

    competencia[contador] =
      parseFloat(relatorio1.value) +
      parseFloat(relatorio2.value) +
      parseFloat(questionario1.value) +
      parseFloat(questionario2.value)

    if (competencia[contador] < 17.5) {
      ocultar.style.display = 'none'
      notaInsuficiente.style.display = 'flex'
      return
    }

    if (contador >= 1) {
      label(false)
      ocultarBotao(true)
      exibirMedia()
      return
    }
    return contador++
    // }
  })

  function ocultarBotao(controlador) {
    if (controlador) {
      calcular.style.display = 'none'
      limpar.style.display = 'none'
    } else {
      calcular.style.display = ''
      limpar.style.display = ''
    }
  }

  form.addEventListener('reset', function (e) {
    e.preventDefault()

    modificarInput(false)
    ocultarBotao(false)
  })

  function reiniciar() {
    location.reload()
  }
})
