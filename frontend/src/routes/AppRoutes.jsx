import { Navigate, Route, Routes } from "react-router-dom"

import Login from "../pages/autenticacao/Login"
import Cadastro from "../pages/autenticacao/Cadastro"
import Painel from "../pages/painel"

import PrivateRoute from "./PrivateRoute"

import AdminLayout from "../layouts/AdminLayout"
import Dashboard from "../pages/administrador/Dashboard"
import Estacionamento from "../pages/administrador/Estacionamento"
import Pisos from "../pages/administrador/Pisos"
import Vagas from "../pages/administrador/Vagas"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            <Route
                path="/painel"
                element={
                    <PrivateRoute>
                        <Painel />
                    </PrivateRoute>
                }
            />

            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoute>
                        <AdminLayout>
                            <Dashboard />
                        </AdminLayout>
                    </PrivateRoute>
                }
            />

            <Route
                path="/admin/estacionamento"
                element={
                    <PrivateRoute>
                        <AdminLayout>
                            <Estacionamento />
                        </AdminLayout>
                    </PrivateRoute>
                }
            />

            <Route
                path="/admin/pisos"
                element={
                    <PrivateRoute>
                        <AdminLayout>
                            <Pisos />
                        </AdminLayout>
                    </PrivateRoute>
                }
            />

            <Route
                path="/admin/vagas"
                element={
                    <PrivateRoute>
                        <AdminLayout>
                            <Vagas />
                        </AdminLayout>
                    </PrivateRoute>
                }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
