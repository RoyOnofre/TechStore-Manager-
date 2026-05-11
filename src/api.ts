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
    if (!res.ok) throw new Error((await res.json()).detail);
    return res.json();
  },

  registrar: async (nombre: string, correo: string, contrasena: string, rol: string) => {
    const res = await fetch(`${API_URL}/auth/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contrasena, rol })
    });
    if (!res.ok) throw new Error((await res.json()).detail);
    return res.json();
  },

  resetContrasena: async (correo: string, nueva_contrasena: string) => {
    const res = await fetch(`${API_URL}/auth/reset-contrasena`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, nueva_contrasena })
    });
    if (!res.ok) throw new Error((await res.json()).detail);
    return res.json();
  },

  // ─────────────────────────────────────────
  // GESTIÓN DE USUARIOS (CRUD COMPLETO)
  // ─────────────────────────────────────────
  getUsuarios: async (filtros?: { buscar?: string; rol?: string; estado?: string }) => {
    const params = new URLSearchParams();
    if (filtros?.buscar) params.append("buscar", filtros.buscar);
    if (filtros?.rol && filtros.rol !== "todos") params.append("rol", filtros.rol);
    if (filtros?.estado && filtros.estado !== "todos") params.append("estado", filtros.estado);
    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${API_URL}/usuarios${query}`);
    if (!res.ok) throw new Error("Error obteniendo usuarios");
    return res.json();
  },

  actualizarUsuario: async (id: string, datos: {
    nombre?: string;
    correo?: string;
    rol?: string;
    estado?: string;
    nueva_contrasena?: string;
  }) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    if (!res.ok) throw new Error((await res.json()).detail);
    return res.json();
  },

  cambiarEstadoUsuario: async (id: string) => {
    const res = await fetch(`${API_URL}/usuarios/${id}/estado`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error((await res.json()).detail);
    return res.json();
  },

  eliminarUsuario: async (id: string) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error((await res.json()).detail);
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

  crearProducto: async (producto: any) => {
    const res = await fetch(`${API_URL}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto)
    });
    if (!res.ok) throw new Error("Error creando producto");
    return res.json();
  },

  // ─────────────────────────────────────────
  // VENTAS
  // ─────────────────────────────────────────
  crearVenta: async (venta: any) => {
    const res = await fetch(`${API_URL}/ventas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venta)
    });
    if (!res.ok) throw new Error((await res.json()).detail);
    return res.json();
  },

  descargarReporte: () => {
    window.open(`${API_URL}/reportes/ventas/pdf`, "_blank");
  },

  descargarReporteUsuarios: () => {
    window.open(`${API_URL}/reportes/usuarios/pdf`, "_blank");
  }
};
