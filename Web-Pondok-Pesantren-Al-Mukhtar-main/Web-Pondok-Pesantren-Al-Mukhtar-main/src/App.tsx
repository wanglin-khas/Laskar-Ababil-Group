/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tentang from './pages/Tentang';
import UnitKajian from './pages/UnitKajian';
import UnitProgram from './pages/UnitProgram';
import UnitPendidikan from './pages/UnitPendidikan';
import Galeri from './pages/Galeri';
import Pendaftaran from './pages/Pendaftaran';
import Berita from './pages/Berita';
import Kontak from './pages/Kontak';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { useStore } from './store';

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const isAdminAuthenticated = useStore((state) => state.isAdminAuthenticated);
  if (!isAdminAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tentang" element={<Tentang />} />
          <Route path="unit-kajian" element={<UnitKajian />} />
          <Route path="unit-program" element={<UnitProgram />} />
          <Route path="unit-pendidikan" element={<UnitPendidikan />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="pendaftaran" element={<Pendaftaran />} />
          <Route path="berita" element={<Berita />} />
          <Route path="kontak" element={<Kontak />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      </Routes>
    </Router>
  );
}
