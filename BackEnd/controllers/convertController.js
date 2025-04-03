import * as convertService from '../services/convertService.js';

export const convertFiles = async (req, res) => {
  const { base64Files, fileNames, token } = req.body;

  console.log('Token:', token);
  console.log('Nombres:', fileNames);
  console.log('Total archivos:', base64Files.length);
  console.log(base64Files[0]?.slice(0, 100), '...');

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

  console.log('Token:', token);
  console.log('URLs:', urls);

  try {
    const result = await convertService.convertUrls(urls, token);
    res.json({ pdfBase64: result });
  } catch (error) {
    console.error('Error al convertir URLs:', error.message);
    res.status(500).json({ error: 'Error en la conversión de URLs.' });
  }
};
