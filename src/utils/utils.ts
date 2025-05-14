export function removeNonNumeric(value: string): string {
    return value.replace(/\D/g, ''); // Remove todos os caracteres que não são números
  }
  
  export function formatDateToYYYYMMDD(date: string | Date | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Retorna apenas a parte da data no formato YYYY-MM-DD
  }