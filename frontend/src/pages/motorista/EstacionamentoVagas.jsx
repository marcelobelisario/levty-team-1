import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"

import "./EstacionamentoVagas.css"

import estacionamentoService from "../../services/estacionamentoService"
import vagaService from "../../services/vagaService"

function situacaoDaVaga(vaga) {
    if (vaga.em_manutencao) {
        return { rotulo: "Manutenção", modificador: "manutencao" }
    }

    if (vaga.is_ocupada) {
        return { rotulo: "Ocupada", modificador: "ocupada" }
    }

    return { rotulo: "Livre", modificador: "livre" }
}

export default function EstacionamentoVagas() {
    const { id } = useParams()

    const [estacionamento, setEstacionamento] = useState(null)
    const [vagas, setVagas] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState("")

    useEffect(() => {
        async function carregar() {
            try {
                const [dadosEstacionamento, dadosVagas] = await Promise.all([
                    estacionamentoService.buscarPorId(id),
                    vagaService.buscarVagasPorEstacionamentoId(id),
                ])

                setEstacionamento(dadosEstacionamento)
                setVagas(dadosVagas || [])
            } catch (error) {
                setErro(error.message)
            } finally {
                setCarregando(false)
            }
        }

        carregar()
    }, [id])

    const vagasLivres = useMemo(
        () => vagas.filter((vaga) => !vaga.is_ocupada && !vaga.em_manutencao).length,
        [vagas]
    )

    const pisos = useMemo(() => {
        const agrupados = new Map()

        vagas.forEach((vaga) => {
            if (!agrupados.has(vaga.piso_id)) {
                agrupados.set(vaga.piso_id, {
                    id: vaga.piso_id,
                    nome: vaga.piso_nome,
                    andar: vaga.piso_andar,
                    vagas: [],
                })
            }

            agrupados.get(vaga.piso_id).vagas.push(vaga)
        })

        return Array.from(agrupados.values())
    }, [vagas])

    return (
        <section className="detalhe">

            <Link to="/motorista" className="detalhe-voltar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Voltar para os estacionamentos
            </Link>

            {erro && <div className="detalhe-aviso detalhe-aviso--erro">{erro}</div>}

            {carregando && <div className="detalhe-estado">Carregando vagas...</div>}

            {!carregando && estacionamento && (
                <>
                    <div className="detalhe-cabecalho">
                        <div>
                            <h1>{estacionamento.nome}</h1>
                            <p>
                                {estacionamento.logradouro}, {estacionamento.numero} · {estacionamento.bairro}
                                {" · "}
                                {estacionamento.cidade_nome} - {estacionamento.cidade_uf}
                            </p>
                        </div>

                        <div className={`detalhe-resumo ${vagasLivres === 0 ? "detalhe-resumo--lotado" : ""}`}>
                            <span className="detalhe-resumo-numero">{vagasLivres}</span>
                            <span className="detalhe-resumo-texto">
                                {vagasLivres === 1 ? "vaga livre" : "vagas livres"}
                                <br />
                                de {vagas.length}
                            </span>
                        </div>
                    </div>

                    <div className="detalhe-legenda">
                        <span><i className="detalhe-ponto detalhe-ponto--livre" /> Livre</span>
                        <span><i className="detalhe-ponto detalhe-ponto--ocupada" /> Ocupada</span>
                        <span><i className="detalhe-ponto detalhe-ponto--manutencao" /> Manutenção</span>
                    </div>

                    {vagas.length === 0 && (
                        <div className="detalhe-estado">
                            Este estacionamento ainda não tem vagas cadastradas.
                        </div>
                    )}

                    {pisos.map((piso) => (
                        <div key={piso.id} className="detalhe-piso">
                            <div className="detalhe-piso-cabecalho">
                                <h2>{piso.nome}</h2>
                                <span className="detalhe-piso-andar">Andar {piso.andar}</span>
                                <span className="detalhe-piso-contagem">
                                    {piso.vagas.filter((vaga) => !vaga.is_ocupada && !vaga.em_manutencao).length} de {piso.vagas.length} livres
                                </span>
                            </div>

                            <ul className="detalhe-vagas">
                                {piso.vagas.map((vaga) => {
                                    const situacao = situacaoDaVaga(vaga)

                                    return (
                                        <li
                                            key={vaga.id}
                                            className={`detalhe-vaga detalhe-vaga--${situacao.modificador}`}
                                        >
                                            <span className="detalhe-vaga-nome">{vaga.nome}</span>
                                            <span className="detalhe-vaga-codigo">{vaga.codigo}</span>
                                            <span className="detalhe-vaga-situacao">{situacao.rotulo}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </>
            )}
        </section>
    )
}
