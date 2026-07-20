import { useEffect, useState } from "react"

import "./Pisos.css"

import Button from "../../components/Button"
import Input from "../../components/Input"

import pisoService from "../../services/pisoService"
import estacionamentoService from "../../services/estacionamentoService"

const FORMULARIO_INICIAL = {
    codigo: "",
    nome: "",
    andar: "",
    vagas: "",
    estacionamento_id: "",
}

export default function Pisos() {
    const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
    const [estacionamentos, setEstacionamentos] = useState([])
    const [carregandoEstacionamentos, setCarregandoEstacionamentos] = useState(true)
    const [erro, setErro] = useState("")
    const [sucesso, setSucesso] = useState("")
    const [salvando, setSalvando] = useState(false)

    useEffect(() => {
        async function carregarEstacionamentos() {
            try {
                const resultado = await estacionamentoService.listarTodos()
                setEstacionamentos(resultado || [])
            } catch (error) {
                setErro(error.message)
            } finally {
                setCarregandoEstacionamentos(false)
            }
        }

        carregarEstacionamentos()
    }, [])

    function handleChange(campo) {
        return (e) => setFormulario((atual) => ({ ...atual, [campo]: e.target.value }))
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

        const andar = Number(formulario.andar)
        const vagas = Number(formulario.vagas)

        if (!Number.isInteger(andar)) {
            setErro("O andar deve ser um número inteiro.")
            return
        }

        if (!Number.isInteger(vagas) || vagas < 1) {
            setErro("A quantidade de vagas deve ser um número inteiro maior que zero.")
            return
        }

        if (!formulario.estacionamento_id) {
            setErro("Selecione o estacionamento ao qual o piso pertence.")
            return
        }

        setSalvando(true)

        try {
            const piso = await pisoService.cadastrarPiso({
                codigo: formulario.codigo.trim(),
                nome: formulario.nome.trim(),
                andar,
                vagas,
                estacionamento_id: formulario.estacionamento_id,
            })

            setFormulario(FORMULARIO_INICIAL)
            setSucesso(`Piso cadastrado com sucesso: ${piso.nome} (${piso.codigo}).`)
        } catch (error) {
            setErro(error.message)
        } finally {
            setSalvando(false)
        }
    }

    return (
        <section className="screen active" id="screen-pisos">
            <div className="piso-card">

                <div className="piso-card-head">
                    <h3>Cadastrar piso</h3>
                    <div className="hint">
                        Informe os dados do novo piso e o estacionamento ao qual ele pertence.
                    </div>
                </div>

                <form className="piso-form" onSubmit={handleCadastro}>

                    <div className="piso-linha">
                        <div className="piso-campo">
                            <label htmlFor="codigo">Código</label>
                            <Input
                                id="codigo"
                                placeholder="Ex.: P-01"
                                value={formulario.codigo}
                                onChange={handleChange("codigo")}
                                required
                            />
                            <span className="ajuda">Precisa ser único entre os pisos.</span>
                        </div>

                        <div className="piso-campo">
                            <label htmlFor="nome">Nome</label>
                            <Input
                                id="nome"
                                placeholder="Ex.: Térreo"
                                value={formulario.nome}
                                onChange={handleChange("nome")}
                                required
                            />
                        </div>
                    </div>

                    <div className="piso-linha">
                        <div className="piso-campo">
                            <label htmlFor="andar">Andar</label>
                            <Input
                                id="andar"
                                type="number"
                                step="1"
                                placeholder="Ex.: 0 para o térreo"
                                value={formulario.andar}
                                onChange={handleChange("andar")}
                                required
                            />
                            <span className="ajuda">Use números negativos para subsolos.</span>
                        </div>

                        <div className="piso-campo">
                            <label htmlFor="vagas">Quantidade de vagas</label>
                            <Input
                                id="vagas"
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Ex.: 120"
                                value={formulario.vagas}
                                onChange={handleChange("vagas")}
                                required
                            />
                        </div>
                    </div>

                    <div className="piso-campo">
                        <label htmlFor="estacionamento_id">Estacionamento</label>
                        <select
                            id="estacionamento_id"
                            className="piso-select"
                            value={formulario.estacionamento_id}
                            onChange={handleChange("estacionamento_id")}
                            disabled={carregandoEstacionamentos}
                            required
                        >
                            <option value="">
                                {carregandoEstacionamentos
                                    ? "Carregando estacionamentos..."
                                    : "Selecione um estacionamento"}
                            </option>

                            {estacionamentos.map((estacionamento) => (
                                <option key={estacionamento.id} value={estacionamento.id}>
                                    {estacionamento.nome}
                                </option>
                            ))}
                        </select>

                        {!carregandoEstacionamentos && estacionamentos.length === 0 && (
                            <span className="ajuda">
                                Nenhum estacionamento cadastrado. Cadastre um estacionamento antes de criar pisos.
                            </span>
                        )}
                    </div>

                    {erro && <div className="piso-aviso piso-aviso--erro">{erro}</div>}
                    {sucesso && <div className="piso-aviso piso-aviso--sucesso">{sucesso}</div>}

                    <div className="piso-acoes">
                        <button
                            type="button"
                            className="piso-botao-limpar"
                            onClick={handleLimpar}
                            disabled={salvando}
                        >
                            Limpar
                        </button>

                        <Button type="submit" disabled={salvando || carregandoEstacionamentos}>
                            {salvando ? "Cadastrando..." : "Cadastrar piso"}
                        </Button>
                    </div>

                </form>
            </div>
        </section>
    )
}
