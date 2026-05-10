"""
recrear_usuarios.py
────────────────────────────────────────────────
Script de utilidad para TechStore Manager.
Elimina todos los usuarios existentes y crea los
usuarios base del sistema (admin y cajero demo).

Uso:
    python recrear_usuarios.py
"""

from database import SessionLocal, engine
import models
import uuid
from passlib.context import CryptContext

from sqlalchemy import text

# Asegurar que las tablas existan
models.Base.metadata.create_all(bind=engine)

# Master Tip: Si la tabla ya existe, create_all no agregará columnas nuevas.
# Ejecutamos un ALTER TABLE manual para asegurar que 'ultimo_login' exista.
with engine.connect() as connection:
    try:
        connection.execute(text("ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS ultimo_login TIMESTAMP;"))
        connection.commit()
        print("[OK] Columna 'ultimo_login' verificada/agregada.")
    except Exception as e:
        print(f"[INFO] No se pudo alterar la tabla (probablemente ya existe): {e}")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

USUARIOS_BASE = [
    {
        "nombre": "Admin TechStore",
        "correo": "admin@techstore.com",
        "contrasena": "admin123",
        "rol": "admin",
        "estado": "Activo",
    },
    {
        "nombre": "Cajero Demo",
        "correo": "cajero@techstore.com",
        "contrasena": "cajero123",
        "rol": "cajero",
        "estado": "Activo",
    },
    {
        "nombre": "Supervisor General",
        "correo": "supervisor@techstore.com",
        "contrasena": "super123",
        "rol": "admin",
        "estado": "Activo",
    },
]

def recrear_usuarios():
    bd = SessionLocal()
    try:
        # 1. Borrar usuarios existentes (cuidado: no borra ventas asociadas)
        eliminados = bd.query(models.Usuario).delete()
        bd.commit()
        print(f"[OK] {eliminados} usuario(s) eliminado(s).")

        # 2. Crear usuarios base
        for datos in USUARIOS_BASE:
            iniciales = "".join([n[0] for n in datos["nombre"].split()]).upper()[:2]
            nuevo = models.Usuario(
                id=str(uuid.uuid4()),
                nombre=datos["nombre"],
                correo=datos["correo"],
                contrasena_encriptada=pwd_context.hash(datos["contrasena"]),
                rol=datos["rol"],
                estado=datos["estado"],
                iniciales=iniciales,
            )
            bd.add(nuevo)
            print(f"   [+] Creando: {datos['nombre']} ({datos['rol']}) - {datos['correo']}")

        bd.commit()
        print("\n[OK] Usuarios base creados exitosamente.")
        print("-" * 45)
        print("  admin@techstore.com      -> admin123")
        print("  cajero@techstore.com     -> cajero123")
        print("  supervisor@techstore.com -> super123")
        print("-" * 45)

    except Exception as e:
        bd.rollback()
        print(f"[ERROR]: {e}")
    finally:
        bd.close()

if __name__ == "__main__":
    print("=" * 45)
    print("  TechStore — Recrear Usuarios Base")
    print("=" * 45)
    recrear_usuarios()
