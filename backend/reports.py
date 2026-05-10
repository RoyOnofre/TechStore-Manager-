import os
from fpdf import FPDF
import datetime

REPORTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "reportes_generados")
if not os.path.exists(REPORTS_DIR):
    os.makedirs(REPORTS_DIR)

class PDFReport(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(80)
        self.cell(30, 10, 'TechStore Manager - Reporte de Ventas Oficial', 0, 0, 'C')
        self.ln(20)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Página {self.page_no()}/{{nb}}', 0, 0, 'C')

def generar_pdf_ventas(datos_ventas: list) -> str:
    pdf = PDFReport()
    pdf.alias_nb_pages()
    pdf.add_page()
    pdf.set_font('Arial', '', 12)
    
    pdf.cell(0, 10, f"Fecha de generación: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", 0, 1)
    pdf.ln(10)
    
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(40, 10, 'ID Venta', 1)
    pdf.cell(60, 10, 'Cliente', 1)
    pdf.cell(40, 10, 'Total ($)', 1)
    pdf.cell(40, 10, 'Cajero', 1)
    pdf.ln()
    
    pdf.set_font('Arial', '', 12)
    ganancia_total = 0
    
    for venta in datos_ventas:
        pdf.cell(40, 10, str(venta.id)[0:8], 1)
        pdf.cell(60, 10, str(venta.cliente), 1)
        pdf.cell(40, 10, f"{venta.total:.2f}", 1)
        
        # Mostrar el ID del cajero temporalmente si no tenemos el nombre cargado
        cajero_info = str(venta.usuario_id)[0:8] if venta.usuario_id else "N/A"
        pdf.cell(40, 10, cajero_info, 1)
        pdf.ln()
        
        if venta.estado == "Completada":
            ganancia_total += venta.total

    pdf.ln(10)
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, f"GANANCIA TOTAL: ${ganancia_total:.2f}", 0, 1)
    
    nombre_archivo = f"Reporte_Ventas_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    ruta_archivo = os.path.join(REPORTS_DIR, nombre_archivo)
    pdf.output(ruta_archivo, 'F')
    
    return ruta_archivo

def generar_pdf_usuarios(usuarios: list) -> str:
    pdf = PDFReport()
    pdf.alias_nb_pages()
    pdf.add_page()
    pdf.set_font('Arial', '', 12)
    
    pdf.cell(0, 10, f"Reporte de Usuarios - Generado: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", 0, 1)
    pdf.ln(10)
    
    pdf.set_font('Arial', 'B', 10)
    pdf.cell(60, 10, 'Nombre', 1)
    pdf.cell(50, 10, 'Correo', 1)
    pdf.cell(25, 10, 'Rol', 1)
    pdf.cell(25, 10, 'Estado', 1)
    pdf.cell(30, 10, 'Ult. Login', 1)
    pdf.ln()
    
    pdf.set_font('Arial', '', 9)
    for u in usuarios:
        # Manejo de nombres largos
        nombre = (u.nombre[:25] + '..') if len(u.nombre) > 25 else u.nombre
        pdf.cell(60, 10, nombre, 1)
        pdf.cell(50, 10, u.correo, 1)
        pdf.cell(25, 10, u.rol.capitalize(), 1)
        pdf.cell(25, 10, u.estado, 1)
        
        # Formatear fecha de último login
        ultimo = "Nunca"
        if u.ultimo_login:
            ultimo = u.ultimo_login.strftime('%d/%m %H:%M')
        pdf.cell(30, 10, ultimo, 1)
        pdf.ln()
    
    nombre_archivo = f"Reporte_Usuarios_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    ruta_archivo = os.path.join(REPORTS_DIR, nombre_archivo)
    pdf.output(ruta_archivo, 'F')
    
    return ruta_archivo
