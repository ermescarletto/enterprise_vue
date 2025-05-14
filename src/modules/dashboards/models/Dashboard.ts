export class DashboardPublico {
    id?: number; 
    nome: string;
    workspace_id: string;
    report_id: string;
    url_dashboard?: string | null;
    ativo: boolean;
    publico: boolean;
    constructor (data: any) {
        this.id = data.id;
        this.nome = data.nome;
        this.workspace_id = data.workspace_id;
        this.report_id = data.report_id;
        this.url_dashboard = data.url_dashboard;
        this.ativo = data.ativo;
        this.publico = data.publico;
    }
  }
  