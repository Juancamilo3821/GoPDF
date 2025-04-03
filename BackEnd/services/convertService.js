import soap from 'soap';
import config from '../config.js';

export async function convertFiles(base64Files, fileNames, token) {
  try {
    const client = await soap.createClientAsync(config.soapUrl);
    const args = { base64Files, fileNames, userToken: token };
    const [result] = await client.convertOfficeFilesAsync(args);
    return result.return;
  } catch (error) {
    console.error('Error en convertFiles (SOAP):', error.message);
    throw new Error('No se pudo conectar al servicio SOAP.');
  }
}

export async function convertUrls(urls, token) {
  try {
    const client = await soap.createClientAsync(config.soapUrl);
    const args = { urls, userToken: token };
    const [result] = await client.convertUrlsAsync(args);
    return result.return;
  } catch (error) {
    console.error('Error en convertUrls (SOAP):', error.message);
    throw new Error('No se pudo conectar al servicio SOAP.');
  }
}