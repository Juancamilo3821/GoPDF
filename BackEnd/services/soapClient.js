
import soap from 'soap';

const wsdlUrl = 'http://localhost:8080/ServerInterface?wsdl';

export async function sayHelloFromServerInterface(name) {
  try {
    const client = await soap.createClientAsync(wsdlUrl);
    const result = await client.sayHelloAsync({ name });
    return result[0].return;
  } catch (error) {
    console.error('SOAP Error:', error);
    throw error;
  }
}
