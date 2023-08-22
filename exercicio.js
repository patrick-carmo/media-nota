function nota(competencia) {
  let notas = 0

  for (let i = competencia; i <= (competencia === 1 ? 1 : 3); i++) {
    let questionario = parseFloat(
      prompt(`Digite a nota ${i} do questionário: `)
    )
    let relatorio = parseFloat(prompt(`Digite a nota ${i} do relatório: `))

    notas += questionario + relatorio

    if (i === 2) {
      break
    }
  }

  if (notas < 17.5) {
    const recuperacao = parseFloat(
      prompt(`Digite a nota da recuperação da competência ${competencia}: `)
    )

    notas += recuperacao

    return notas
  }

  return notas
}

let competencia1 = nota(1)
let competencia2 = nota(2)

const competenciaFinal = competencia1 + competencia2

const projeto1 = parseFloat(prompt('Digite a nota do pp'))
const projeto2 = parseFloat(prompt('Digite a nota do pf'))
const apresentacaoProjeto = parseFloat(prompt('Digite a nota do pa'))

const projetoFinal = projeto1 + projeto2 + apresentacaoProjeto

const integradora = parseFloat(prompt('Digite a nota da prova integradora'))

let media = (competenciaFinal + projetoFinal + integradora) / 2

if (media < 60) {
  const substitutiva = parseFloat(
    prompt('Digite a nota da prova substitutiva: ')
  )
  media = (media + substitutiva) / 2

  if (media < 60) {
    alert(`Media final: ${media} - Reprovado!`)
  } else {
    alert(`Media final: ${media} - Aprovado!`)
  }
} else {
  alert(`Media final: ${media} - Aprovado!`)
}
