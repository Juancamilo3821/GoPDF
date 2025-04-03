const conversiones = [
    { tipo: 'office', fecha: '2025-04-01T09:15:00', archivo: 'informe.docx', peso: 524288 },
    { tipo: 'url', fecha: '2025-04-01T11:20:00', archivo: 'https://sitio.com', peso: 1048576 },
    { tipo: 'office', fecha: '2025-04-01T12:45:00', archivo: 'datos.xlsx', peso: 786432 },
    { tipo: 'office', fecha: '2025-04-02T08:00:00', archivo: 'presentacion.pptx', peso: 1572864 },
    { tipo: 'url', fecha: '2025-04-02T10:30:00', archivo: 'https://ejemplo.org', peso: 512000 },
    { tipo: 'office', fecha: '2025-04-02T14:15:00', archivo: 'resumen.docx', peso: 430080 },
    { tipo: 'office', fecha: '2025-04-02T15:00:00', archivo: 'finanzas.xlsx', peso: 921600 },
    { tipo: 'url', fecha: '2025-04-02T15:45:00', archivo: 'https://blog.dev', peso: 204800 },
    { tipo: 'office', fecha: '2025-04-02T16:00:00', archivo: 'plan.pptx', peso: 1024000 },
    { tipo: 'url', fecha: '2025-04-02T16:30:00', archivo: 'https://vuejs.org', peso: 256000 },
    { tipo: 'office', fecha: '2025-03-04T09:00:00', archivo: 'cv.docx', peso: 380928 },
    { tipo: 'office', fecha: '2025-03-04T10:00:00', archivo: 'factura.xlsx', peso: 655360 },
    { tipo: 'url', fecha: '2025-03-04T10:30:00', archivo: 'https://github.com', peso: 307200 },
];


export async function obtenerEstadisticas() {
    const total = conversiones.length;
    const office = conversiones.filter(c => c.tipo === 'office').length;
    const urls = conversiones.filter(c => c.tipo === 'url').length;

    const pesoTotalBytes = conversiones.reduce((sum, c) => sum + c.peso, 0);
    const pesoTotalMB = (pesoTotalBytes / (1024 * 1024)).toFixed(2);

    return { total, office, urls, pesoTotalMB };
};

export async function obtenerReporte() {
    return conversiones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
};
