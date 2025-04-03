import * as convertService from '../services/convertService.js';

export const convertFiles = async (req, res) => {
  const { base64Files, fileNames, token } = req.body;

  try {
    const result = await convertService.convertFiles(base64Files, fileNames, token);
    res.json({ pdfBase64: result });
  } catch (error) {
    console.error('Error al convertir archivos:', error.message);
    res.status(500).json({ error: 'Error en la conversión de archivos.' });
  }
};

export const convertUrls = async (req, res) => {
  const { urls, token } = req.body;

  try {
    const result = await convertService.convertUrls(urls, token);
    res.json({ pdfBase64: result });
  } catch (error) {
    console.error('Error al convertir URLs:', error.message);
    res.status(500).json({ error: 'Error en la conversión de URLs.' });
  }
};
