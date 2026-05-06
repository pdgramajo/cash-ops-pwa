import jsPDF from 'jspdf';
import type { CashSession, Transaction, InventoryMovement } from '../types/database';
import { formatCurrency, formatDate, formatDateTime, formatNumber } from '../utils/formatters';

interface ReportData {
  session: CashSession;
  transactions: Transaction[];
  movements: InventoryMovement[];
}

export const reportService = {
  async generateSessionReport(data: ReportData): Promise<jsPDF> {
    const { session, transactions, movements } = data;
    const doc = new jsPDF();

    let y = 20;
    const lineHeight = 8;
    const margin = 20;

    doc.setFontSize(18);
    doc.text('Reporte de Sesión', margin, y);
    y += lineHeight * 2;

    doc.setFontSize(12);
    doc.text(`Sesión #: ${session.id}`, margin, y);
    y += lineHeight;
    doc.text(`Fecha: ${formatDateTime(session.openedAt)}`, margin, y);
    y += lineHeight;
    doc.text(`Estado: ${session.status}`, margin, y);
    y += lineHeight * 2;

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transactions) {
      if (tx.type === 'INCOME') totalIncome += tx.amount;
      else totalExpense += tx.amount;
    }

    const closingBalance = session.closingBalance || 0;
    const expectedBalance = (session.openingBalance || 0) + totalIncome - totalExpense;
    const difference = closingBalance - expectedBalance;

    doc.setFontSize(14);
    doc.text('Resumen de Transacciones', margin, y);
    y += lineHeight * 1.5;

    doc.setFontSize(11);
    doc.text(`Saldo Inicial: ${formatCurrency(session.openingBalance || 0)}`, margin, y);
    y += lineHeight;
    doc.text(`Ingresos: ${formatCurrency(totalIncome)}`, margin, y);
    y += lineHeight;
    doc.text(`Egresos: ${formatCurrency(totalExpense)}`, margin, y);
    y += lineHeight;
    doc.text(`Saldo Esperado: ${formatCurrency(expectedBalance)}`, margin, y);
    y += lineHeight;
    doc.text(`Saldo Final: ${formatCurrency(closingBalance)}`, margin, y);
    y += lineHeight;

    doc.setTextColor(difference >= 0 ? 0 : 200, difference >= 0 ? 0 : 0, difference >= 0 ? 0 : 0);
    doc.text(`Diferencia: ${formatCurrency(difference)}`, margin, y);
    doc.setTextColor(0, 0, 0);
    y += lineHeight * 2;

    if (transactions.length > 0) {
      doc.setFontSize(14);
      doc.text('Detalle de Transacciones', margin, y);
      y += lineHeight * 1.5;
      doc.setFontSize(10);
      for (const tx of transactions) {
        if (y > 270) { doc.addPage(); y = 20; }
        const prefix = tx.type === 'INCOME' ? '+' : '-';
        doc.text(`${formatDateTime(tx.processedAt)} | ${prefix}${formatCurrency(tx.amount)} | ${tx.description.substring(0, 30)}`, margin, y);
        y += lineHeight;
      }
    }

    if (movements && movements.length > 0) {
      y += lineHeight;
      doc.setFontSize(14);
      doc.text('Movimientos de Inventario', margin, y);
      y += lineHeight * 1.5;
      doc.setFontSize(10);
      for (const m of movements) {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${formatDateTime(m.movementDate)} | ${m.productName} | ${formatNumber(m.quantity)} ${m.unit}`, margin, y);
        y += lineHeight;
      }
    }

    return doc;
  },

  async generateDailyReport(date: Date, _sessions: CashSession[], _txMap: Map<number, Transaction[]>): Promise<jsPDF> {
    const doc = new jsPDF();

    let y = 20;
    const lineHeight = 8;
    const margin = 20;

    doc.setFontSize(18);
    doc.text('Reporte Diario', margin, y);
    y += lineHeight * 2;

    doc.setFontSize(12);
    doc.text(`Fecha: ${formatDate(date)}`, margin, y);

    return doc;
  },

  downloadPDF(doc: jsPDF, filename: string): void {
    doc.save(filename);
  },
};