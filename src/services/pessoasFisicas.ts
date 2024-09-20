export const PessoaFisica = {
    async getData(): Promise<Array<{
        id: number;
        nome: string;
        data_nascimento: string;
        cpf: string;
        sexo: string;
        email: string;        
        telefone: string;
    }>> {
        try {
            const response = await fetch('http://localhost:8000/cadastros/api/pessoasfisicas/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return [];
        }
    },

    getCustomersSmall() {
        return this.getData().then((data) => data.slice(0, 10));
    },

    getCustomersMedium() {
        return this.getData().then((data) => data.slice(0, 50));
    },

    getCustomersLarge() {
        return this.getData().then((data) => data.slice(0, 200));
    },

    getCustomersXLarge() {
        return this.getData();
    },

    getCustomers(params?: Record<string, string | number>) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('http://localhost:8000/cadastros/api/pessoasfisicas/?' + queryParams)
            .then((res) => res.json())
            .catch((error) => {
                console.error('Error fetching customers:', error);
                return [];
            });
    }
};
