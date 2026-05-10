const API_URL = "http://localhost:8004/api";

export const api = {
  // ─────────────────────────────────────────
  // AUTENTICACIÓN
  // ─────────────────────────────────────────
  login: async (correo: string, contrasena: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Error en el login");
    }
    return res.json();
  },

  registrar: async (nombre: string, correo: string, contrasena: string, rol: string = "cliente") => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contrasena, rol })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Error en el registro");
    }
    return res.json();
  },

  // ─────────────────────────────────────────
  // PRODUCTOS
  // ─────────────────────────────────────────
  getProductos: async () => {
    const res = await fetch(`${API_URL}/productos`);
    if (!res.ok) throw new Error("Error obteniendo productos");
    return res.json();
  },

  crearProducto: async (data: any) => {
    const res = await fetch(`${API_URL}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear producto");
    const nuevo = await res.json();
    window.dispatchEvent(new Event('inventoryUpdated'));
    return nuevo;
  },

  reordenarStock: async (id: string, cantidad: number) => {
    const res = await fetch(`${API_URL}/productos/${id}/reordenar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cantidad })
    });
    if (!res.ok) throw new Error("Error al reordenar stock");
    window.dispatchEvent(new Event('inventoryUpdated'));
    return res.json();
  },

  // ─────────────────────────────────────────
  // VENTAS
  // ─────────────────────────────────────────
  registrarVenta: async (data: any) => {
    const res = await fetch(`${API_URL}/ventas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al registrar venta");
    return res.json();
  },

  getVentas: async () => {
    const res = await fetch(`${API_URL}/ventas`);
    if (!res.ok) throw new Error("Error obteniendo historial");
    return res.json();
  },

  // ─────────────────────────────────────────
  // USUARIOS Y GESTIÓN
  // ─────────────────────────────────────────
  getUsuarios: async (filtros: { buscar?: string, rol?: string, estado?: string } = {}) => {
    const params = new URLSearchParams();
    if (filtros.buscar) params.append('buscar', filtros.buscar);
    if (filtros.rol && filtros.rol !== 'todos') params.append('rol', filtros.rol);
    if (filtros.estado && filtros.estado !== 'todos') params.append('estado', filtros.estado);
    
    const res = await fetch(`${API_URL}/usuarios?${params.toString()}`);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
  },

  actualizarUsuario: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
  },

  eliminarUsuario: async (id: string) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar usuario");
    return res.json();
  },

  resetContrasena: async (correo: string, nueva: string) => {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, nueva_contrasena: nueva })
    });
    if (!res.ok) throw new Error("Error al restablecer contraseña");
    return res.json();
  },

  cambiarEstadoUsuario: async (id: string) => {
    const res = await fetch(`${API_URL}/usuarios/${id}/toggle-estado`, { method: "POST" });
    if (!res.ok) throw new Error("Error al cambiar estado");
    return res.json();
  },

  // ─────────────────────────────────────────
  // REPORTES
  // ─────────────────────────────────────────
  descargarReporteUsuarios: () => {
    window.open(`${API_URL}/reportes/usuarios/pdf`, "_blank");
  },

  // ─── CONFIGURACIÓN MASTER ───────────────────────────
  getConfiguracion: async () => {
    const res = await fetch(`${API_URL}/configuracion`);
    if (!res.ok) throw new Error('Error al obtener configuración');
    return res.json();
  },

  updateConfiguracionBulk: async (data: any) => {
    const res = await fetch(`${API_URL}/configuracion/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al guardar configuración');
    return res.json();
  }
};
