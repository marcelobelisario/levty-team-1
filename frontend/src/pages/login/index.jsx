import "./styles.css"

import Container from "../../components/Container"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Text from "../../components/Text"

import Logo from '../../assets/logo.png'

export default function Login() {

    function handleLogin(e) {
        e.preventDefault()

        console.log("Login")
    }

    return (
        <Container>

            <form className="login-card">

                <img
                    src={Logo}
                    alt="Logo"
                    className="logo"
                />

                <Text className="titulo">
                    Bem-vindo
                </Text>

                <div className="inputs">

                    <Input
                        placeholder="E-mail"
                        type="email"
                    />

                    <Input
                        placeholder="Senha"
                        type="password"
                    />

                </div>

                <Button onClick={handleLogin}>
                    Entrar
                </Button>

                <Text className="esqueci">
                    Esqueci minha senha
                </Text>

            </form>

        </Container>
    )
}