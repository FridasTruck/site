// components/ProtectedRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Verifique se está importando useAuth corretamente

interface ProtectedRouteProps {
  element: React.ReactNode;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }: ProtectedRouteProps) => {
  const { token } = useAuth(); // Obtém o token de autenticação do contexto
  console.log("Protected",token); // Verifique o token aqui para depuração

  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/error-404" replace /> // Redireciona para página de erro se não houver token
  );
};

export default ProtectedRoute;
