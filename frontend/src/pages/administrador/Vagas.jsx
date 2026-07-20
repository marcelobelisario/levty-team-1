import { useEffect, useState } from "react"

import "./Vagas.css"

import Button from "../../components/Button"
import Input from "../../components/Input"

import vagaService from "../../services/vagaService"
import pisoService from "../../services/pisoService"

const FORMULARIO_INICIAL = {
    codigo: "",
    nome: "",
    piso_id: "",
    is_ocupada: false,
}

export default function Vagas() {
    const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
    const [pisos, setPisos] = useState([])
    const [carregandoPisos, setCarregandoPisos] = useState(true)
    const [erro, setErro] = useState("")
    const [sucesso, setSucesso] = useState("")
    const [salvando, setSalvando] = useState(false)

    useEffect(() => {
        async function carregarPisos() {
            try {
                const resultado = await pisoService.listarTodosPisos()
                setPisos(resultado || [])
            } catch (error) {
                setErro(error.message)
            } finally {
                setCarregandoPisos(false)
            }
        }

        carregarPisos()
    }, [])

    function handleChange(campo) {
        return (e) => {
            const valor = campo === "is_ocupada" ? e.target.checked : e.target.value
            setFormulario((atual) => ({ ...atual, [campo]: valor }))
        }
    }

    function handleLimpar() {
        setFormulario(FORMULARIO_INICIAL)
        setErro("")
        setSucesso("")
    }

    async function handleCadastro(e) {
        e.preventDefault()
        setErro("")
        setSucesso("")

        if (!formulario.piso_id) {
            setErro("Selecione o piso ao qual a vaga pertence.")
            return
        }

        setSalvando(true)

        try {
            const vaga = await vagaService.cadastrarVaga({
                codigo: formulario.codigo.trim(),
                nome: formulario.nome.trim(),
                is_ocupada: formulario.is_ocupada,
                piso_id: formulario.piso_id,
            })

            setFormulario(FORMULARIO_INICIAL)
            setSucesso(`Vaga cadastrada com sucesso: ${vaga.nome} (${vaga.codigo}).`)
        } catch (error) {
            setErro(error.message)
        } finally {
            setSalvando(false)
        }
    }

    return (
        <section className="screen active" id="screen-vagas">
            <div className="vaga-card">

                <div className="vaga-card-head">
                    <h3>Cadastrar vaga</h3>
                    <div className="hint">
                        Informe os dados da nova vaga e o piso ao qual ela pertence.
                    </div>
                </div>

                <form className="vaga-form" onSubmit={handleCadastro}>

                    <div className="vaga-linha">
                        <div className="vaga-campo">
                            <label htmlFor="codigo">Código</label>
                            <Input
                                id="codigo"
                                placeholder="Ex.: V-01"
                                value={formulario.codigo}
                                onChange={handleChange("codigo")}
                                required
                            />
                            <span className="ajuda">Precisa ser único entre as vagas.</span>
                        </div>

                        <div className="vaga-campo">
                            <label htmlFor="nome">Nome</label>
                            <Input
                                id="nome"
                                placeholder="Ex.: Vaga 01"
                                value={formulario.nome}
                                onChange={handleChange("nome")}
                                required
                            />
                        </div>
                    </div>

                    <div className="vaga-campo">
                        <label htmlFor="piso_id">Piso</label>
                        <select
                            id="piso_id"
                            className="vaga-select"
                            value={formulario.piso_id}
                            onChange={handleChange("piso_id")}
                            disabled={carregandoPisos}
                            required
                        >
                            <option value="">
                                {carregandoPisos
                                    ? "Carregando pisos..."
                                    : "Selecione um piso"}
                            </option>

                            {pisos.map((piso) => (
                                <option key={piso.id} value={piso.id}>
                                    {piso.nome} ({piso.codigo})
                                </option>
                            ))}
                        </select>

                        {!carregandoPisos && pisos.length === 0 && (
                            <span className="ajuda">
                                Nenhum piso cadastrado. Cadastre um piso antes de criar vagas.
                            </span>
                        )}
                    </div>

                    <label className="vaga-checkbox">
                        <input
                            type="checkbox"
                            checked={formulario.is_ocupada}
                            onChange={handleChange("is_ocupada")}
                        />
                        Vaga já está ocupada
                    </label>

                    {erro && <div className="vaga-aviso vaga-aviso--erro">{erro}</div>}
                    {sucesso && <div className="vaga-aviso vaga-aviso--sucesso">{sucesso}</div>}

                    <div className="vaga-acoes">
                        <button
                            type="button"
                            className="vaga-botao-limpar"
                            onClick={handleLimpar}
                            disabled={salvando}
                        >
                            Limpar
                        </button>

                        <Button type="submit" disabled={salvando || carregandoPisos}>
                            {salvando ? "Cadastrando..." : "Cadastrar vaga"}
                        </Button>
                    </div>

                </form>
            </div>
        </section>
    )
}
