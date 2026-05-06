export enum SessionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  SETTLED = 'SETTLED',
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum TransactionSubType {
  CASH_IN = 'CASH_IN',
  CASH_OUT = 'CASH_OUT',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  PAYMENT = 'PAYMENT',
  DEPOSIT = 'DEPOSIT',
  ADVANCE = 'ADVANCE',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum RecipientType {
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT',
  SUPPLIER = 'SUPPLIER',
  OTHER = 'OTHER',
}

export enum InventoryMovementType {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
  TRANSFER = 'TRANSFER',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum MovementUnit {
  UNIT = 'UNIT',
  BOX = 'BOX',
  PACK = 'PACK',
  KG = 'KG',
  LITER = 'LITER',
}

export enum ReportType {
  DAILY_SUMMARY = 'DAILY_SUMMARY',
  SESSION_SUMMARY = 'SESSION_SUMMARY',
  INVENTORY_REPORT = 'INVENTORY_REPORT',
  TRANSACTION_REPORT = 'TRANSACTION_REPORT',
}

export interface Branch {
  id?: number;
  name: string;
  address: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CashSession {
  id?: number;
  branchId: number;
  openingBalance: number;
  closingBalance?: number;
  expectedBalance?: number;
  status: SessionStatus;
  openedAt: Date;
  closedAt?: Date;
  openedBy: string;
  closedBy?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id?: number;
  sessionId: number;
  branchId: number;
  type: TransactionType;
  subType: TransactionSubType;
  amount: number;
  recipientType?: RecipientType;
  recipientName?: string;
  description: string;
  reference?: string;
  processedAt: Date;
  processedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryMovement {
  id?: number;
  branchId: number;
  sessionId?: number;
  productCode: string;
  productName: string;
  type: InventoryMovementType;
  quantity: number;
  unit: MovementUnit;
  unitPrice?: number;
  totalPrice?: number;
  notes?: string;
  movementDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReceiptType {
  id?: number;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ReceiptStatus {
  DRAFT = 'DRAFT',
  PRINTED = 'PRINTED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface Receipt {
  id?: number;
  receiptNumber: string;
  receiptTypeId: number;
  sessionId: number;
  branchId: number;
  status: ReceiptStatus;
  recipientName: string;
  recipientDocument?: string;
  amount: number;
  description: string;
  printedAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id?: number;
  branchId: number;
  type: ReportType;
  title: string;
  data: string;
  generatedAt: Date;
  generatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}