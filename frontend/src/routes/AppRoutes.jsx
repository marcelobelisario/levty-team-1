import { Navigate, Route, Routes } from "react-router-dom"

import Login from "../pages/autenticacao/Login"
import Cadastro from "../pages/autenticacao/Cadastro"
import Painel from "../pages/painel"

import PrivateRoute from "./PrivateRoute"

import AdminLayout from "../layouts/AdminLayout"
import Dashboard from "../pages/administrador/Dashboard"
import Veiculos from "../pages/administrador/Veiculos"

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
                path="/admin/veiculos"
                element={
                    <PrivateRoute>
                        <AdminLayout>
                            <Veiculos />
                        </AdminLayout>
                    </PrivateRoute>
                }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
