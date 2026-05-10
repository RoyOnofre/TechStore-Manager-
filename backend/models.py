from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

# --- TABLAS DE APOYO (Deben definirse primero) ---

class Proveedor(Base):
    __tablename__ = "proveedores"
    
    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, index=True)
    contacto = Column(String)
    correo = Column(String)
    telefono = Column(String)
    
    productos = relationship("Producto", back_populates="proveedor")

class Cliente(Base):
    __tablename__ = "clientes"
    
    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, index=True)
    correo = Column(String, unique=True, index=True)
    telefono = Column(String)
    nit_rfc = Column(String) # Para facturación
    direccion = Column(String)
    fecha_registro = Column(DateTime, default=datetime.datetime.utcnow)
    
    ventas = relationship("Venta", back_populates="cliente_obj")

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(String, primary_key=True, index=True)
    nombre = Column(String)
    correo = Column(String, unique=True, index=True)
    contrasena_encriptada = Column(String) 
    rol = Column(String) # admin, cajero, cliente
    estado = Column(String, default="Activo")
    iniciales = Column(String)
    avatar = Column(String, nullable=True)
    ultimo_login = Column(DateTime, nullable=True)  # Último inicio de sesión

    ventas = relationship("Venta", back_populates="vendedor")
    movimientos = relationship("MovimientoInventario", back_populates="usuario")
    auditorias = relationship("Auditoria", back_populates="usuario_obj")

# --- TABLA DE PRODUCTOS ---

class Producto(Base):
    __tablename__ = "productos"

    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, index=True)
    sku = Column(String, unique=True, index=True)
    categoria = Column(String)
    precio = Column(Float)
    stock = Column(Integer)
    imagen = Column(String)
    estado = Column(String)
    meses_garantia_base = Column(Integer, default=12) # Garantía por defecto
    
    # Conexión con Proveedor
    proveedor_id = Column(String, ForeignKey("proveedores.id"), nullable=True)
    proveedor = relationship("Proveedor", back_populates="productos")
    
    movimientos = relationship("MovimientoInventario", back_populates="producto")
    detalles_venta = relationship("DetalleVenta", back_populates="producto")

# --- AUDITORÍA DE INVENTARIO ---

class MovimientoInventario(Base):
    __tablename__ = "movimientos_inventario"
    
    id = Column(String, primary_key=True, index=True)
    fecha = Column(DateTime, default=datetime.datetime.utcnow)
    tipo = Column(String) # ENTRADA, SALIDA, AJUSTE, DEVOLUCION
    cantidad = Column(Integer)
    motivo = Column(String)
    
    producto_id = Column(String, ForeignKey("productos.id"))
    producto = relationship("Producto", back_populates="movimientos")
    
    usuario_id = Column(String, ForeignKey("usuarios.id"))
    usuario = relationship("Usuario", back_populates="movimientos")

# --- VENTAS Y FACTURACIÓN ---

class Venta(Base):
    __tablename__ = "ventas"

    id = Column(String, primary_key=True, index=True)
    fecha = Column(DateTime, default=datetime.datetime.utcnow)
    subtotal = Column(Float)
    impuesto = Column(Float)
    total = Column(Float)
    cantidad_articulos = Column(Integer)
    metodo_pago = Column(String)
    estado = Column(String, default="Completada")
    
    # Conexiones
    usuario_id = Column(String, ForeignKey("usuarios.id")) # Quién lo vendió
    vendedor = relationship("Usuario", back_populates="ventas")
    
    cliente_id = Column(String, ForeignKey("clientes.id"), nullable=True) # A quién se le vendió
    cliente_obj = relationship("Cliente", back_populates="ventas")

    detalles = relationship("DetalleVenta", back_populates="venta")

class DetalleVenta(Base):
    __tablename__ = "detalles_venta"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    venta_id = Column(String, ForeignKey("ventas.id"))
    producto_id = Column(String, ForeignKey("productos.id"))
    cantidad = Column(Integer)
    precio_unitario = Column(Float)
    subtotal = Column(Float)
    
    # Control estricto de tecnología
    numero_serie = Column(String, nullable=True) # Serial de la laptop/celular
    meses_garantia_aplicada = Column(Integer, default=12)

    venta = relationship("Venta", back_populates="detalles")
    producto = relationship("Producto", back_populates="detalles_venta")

class Auditoria(Base):
    __tablename__ = "auditoria"

    id = Column(String, primary_key=True, index=True)
    usuario_id = Column(String, ForeignKey("usuarios.id"))
    accion = Column(String)  # CREAR, EDITAR, ELIMINAR, LOGIN, RESET_PASS
    descripcion = Column(String)
    fecha = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relación para saber qué usuario hizo la acción
    usuario_obj = relationship("Usuario", back_populates="auditorias")
# --- TABLA DE CONFIGURACIÓN ---

class Configuracion(Base):
    __tablename__ = "configuracion"
    
    clave = Column(String, primary_key=True, index=True) # ej: 'tienda_nombre', 'impuesto_iva'
    valor = Column(String) # Guardaremos el valor como string (o JSON string)
    categoria = Column(String, index=True) # ej: 'tienda', 'finanzas', 'seguridad'
    ultima_actualizacion = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
