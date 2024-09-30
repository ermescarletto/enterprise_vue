import axios from 'axios';
import { baseUrl } from './configServices';

// Define a Service class with methods for each API call
class DocumentosService {
    // Method for fetching documentos
    getDocumentos(token: string) {
        const options = {
            method: 'GET',
            url: baseUrl + 'documentos/api/documentos/',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'insomnia/10.0.0',
                Authorization: 'TOKEN ' + token
            }
        };

        return axios(options)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching documentos:", error);
                throw error;
            });
    }

    // Method for fetching politicas
    getPoliticas(token: string) {
        const options = {
            method: 'GET',
            url: baseUrl + 'documentos/api/politicas/',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'insomnia/10.0.0',
                Authorization: 'TOKEN ' + token
            }
        };

        return axios(options)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching politicas:", error);
                throw error;
            });
    }

    // Method for creating a new politica
    createPolitica(token: string) {
        const options = {
            method: 'POST',
            url: baseUrl + 'documentos/api/politicas/',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'insomnia/10.0.0',
                Authorization: 'TOKEN ' + token
            },
            data: {
                codigo_politica: 'FIN-102',
                titulo_politica: 'Financeiro Foi',
                texto_politica: 'Testando a API para POST',
                empresa: 1,
                departamento: 1
            }
        };

        return axios(options)
            .then(response => response.data)
            .catch(error => {
                console.error("Error creating politica:", error);
                throw error;
            });
    }
}

// Export only the service class
export default new DocumentosService();
