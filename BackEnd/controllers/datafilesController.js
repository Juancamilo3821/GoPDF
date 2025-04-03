import { obtenerEstadisticas, obtenerReporte } from '../models/datafilesModel.js';

export async function getStats(req, res) {
    try {
        const stats = await obtenerEstadisticas();
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
}

export async function getReport(req, res) {
    try {
        const reporte = await obtenerReporte()
        res.status(200).json(reporte)
    } catch (error) {
        console.error('Error al obtener actividad completa:', error)
        res.status(500).json({ message: 'Error al obtener actividad' })
    }
}
