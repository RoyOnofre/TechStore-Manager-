from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de Supabase Directa (Usa DIRECT_URL para compatibilidad total con SQLAlchemy)
# Sustituye TU_CONTRASEÑA_AQUI por tu contraseña real
SQLALCHEMY_DATABASE_URL = "postgresql://postgres.eiwmwozjquranqqniwrp:5jwyfwos0209@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

# Crear motor de base de datos PostgreSQL
# En PostgreSQL no necesitamos el check_same_thread
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
