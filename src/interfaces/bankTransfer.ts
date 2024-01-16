// 1
export interface queryBankInfoParams {
  accountNo: string;
  clientId?: string;
}

export interface queryBankInfoResponse {
  readonly bankID: string;
  readonly bankAccNo: string;
  readonly bankBranchID: string;
  readonly bankBranchName: string;
  readonly bankname: string;
  readonly interfaceSeq: string;
  readonly ownerName: string;
  readonly balance: number | null;
  readonly isDefault: boolean;
}

// 2
export interface queryGenFundTransferParams {
  readonly accountNo: string;
  clientId?: string;
}

export interface beneficiaryAccountDetails {
  readonly bankName: string;
  readonly fullName: string;
  readonly accountNo: string;
  readonly bankBranch: string;
  readonly transferFee: number;
}

export interface queryGenFundTransferResponse {
  readonly clientID: string;
  readonly transferableAmount: number;
  readonly beneficiaryAccountList: beneficiaryAccountDetails[];
}

// 3
export interface querySubAccountRetrieveParams {
  clientID: string;
}

export interface querySubAccountRetrieveResponse {
  readonly accountNumber: string;
  readonly clientID: string;
  readonly investorTypeID: string;
  readonly subAccountName: string;
  readonly tradingAccSeq: number;

  readonly subAccountID: string;
  readonly subAccountType: string;
  readonly service: string;
  readonly investorType: string;
  readonly counterPartyAC: string;
  readonly accountState: string;
  readonly sessionID: string;
  readonly defaultSubAccount: boolean;
  readonly investorTypeName: string;
  readonly prohibitBuy: boolean;
  readonly prohibitSell: boolean;
}

// 4
export interface doFundTransferParams {
  content?: string;
  transferFee?: number;
  transferType: string;
  senderFullName: string;
  transferAmount: number;
  senderAccountNo: string;
  transferableAmount: number;
  beneficiaryBankName?: string;
  beneficiaryFullName?: string;
  beneficiaryBankBranch?: string;
  beneficiaryBankNumber?: string;
  beneficiaryBankBranchId?: string;
  clientID?: string;
}

export interface doFundTransferResponse {
  readonly result: string;
  readonly tranID: string;
}

// 5
export interface checkTradeDateResponse {
  readonly weekDay: number;
  readonly coreTime: string;
  readonly dateTime: string;
  readonly businessDay: boolean;
}

// 6
export interface cashTransactionHistoryParams {
  accountNo: string;
  transferType: string;
  status: string;
  fromDate: string;
  toDate: string;
  offset?: number;
  fetchCount?: number;
  clientID?: string;
}

export interface transactionHistoryDetails {
  readonly date: string;
  readonly status: string;
  readonly beneficiary: string;
  readonly transferFee: string;
  readonly transferType: string;
  readonly transferAmount: number;
  readonly beneficiaryBank: string;
  readonly transferAccount: string;
  readonly beneficiaryAccNo: string;
  readonly beneficiaryAccountNo: string;
}

export interface cashTransactionHistoryResponse {
  readonly list: transactionHistoryDetails[];
  readonly totalCount: number;
}

export interface ICashStatementDerParams {
  readonly subAccountID: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly offset?: number;
  readonly fetchCount?: number;
}

export interface ICashStatementParams {
  readonly accountNo: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly transactionType?: string;
  readonly offset?: number;
  readonly fetchCount?: number;
}
export interface IDerCashStatementItemResponse {
  readonly brokerCredit: number;
  readonly brokerDebit: number;
  readonly clientCredit: number;
  readonly clientDebit: number;
  readonly counterPartyAC: string;
  readonly creationTime: string;
  readonly remarks: string;
  readonly totalBalance: number;
  readonly tranType: string;
  readonly txnType: string;
  readonly valueDate: string;
}

export interface IDerCashStatementResponse {
  readonly beginningBalance: number;
  readonly endingBalance: number;
  readonly listTransactionHistory: IDerCashStatementItemResponse[];
}

export interface IEqtCashStatementItemResponse {
  readonly no: number;
  readonly date: string;
  readonly balance: number;
  readonly debitAmount: number;
  readonly description: string;
  readonly creditAmount: number;
  readonly transactionType: string;
}

export interface IEqtCashStatementResponse {
  readonly beginningBalance: number;
  readonly endingBalance: number;
  readonly list: IEqtCashStatementItemResponse[];
}

export interface IDerClientCashBalanceShortverParams {
  readonly accountNo: string;
}

export interface IDerClientCashBalanceShortverResponse {
  readonly transferableAmountToInternalSubsOrToBank: number;
  readonly transferableAmountOfVSDAccount: number;
  readonly transferableAmountToVSDAccount: number;
}

export interface IDerCashTransferParams {
  readonly counterPartyAC?: string;
  readonly accountNumber: string;
  readonly transferType: string;
  readonly transferAmount: number;
  readonly transferableAmount: number;
  readonly content: string;
}

export interface IDerCashTransferResponse {
  readonly tranID: string;
  readonly dwChannel: string;
  readonly transferFee: string;
}

export interface IDerCashDWEnquiryParams {
  readonly accountNo: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly transferType: string;
  readonly status?: string;
  readonly offset?: number;
  readonly fetchCount?: number;
}

export interface IDerCashDWEnquiryResponse {
  readonly date: string;
  readonly transferType: string;
  readonly status: string;
  readonly transferAmount?: number;
}

export interface IDerCpCashDWParams {
  readonly sendingAccountNo: string;
  readonly beneficiaryAccountNo: string;
  readonly transferType: string;
  readonly transferAmount: number;
  readonly transferableAmount: number;
  readonly content: string;
}

export interface IDerCpCashDWResponse {
  readonly transactionID: string;
}

export interface IDerCashDWParams {
  readonly transferType: string;
  readonly sendingAccountNumber: string;
  readonly sendingFullName: string;
  readonly transferableAmount: number;
  readonly beneficiaryAccountNumber: string;
  readonly beneficiaryFullName: string;
  readonly transferAmount: number;
  readonly beneficiaryBank: string;
  readonly beneficiaryBankBranch: string;
  readonly content: string;
  readonly transferFee: number;
}

export interface IDerCashDWResponse {
  readonly tranID: string;
  readonly dwChannel: string;
  readonly transferFee: string;
}

export interface IDerCpCashDWEnquiryParams {
  readonly accountNo: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly status: string;
  readonly transferType: string;
}

export interface IDerCpCashDWEnquiryResponse {
  readonly date: string;
  readonly status: string;
  readonly content: string;
  readonly beneficiary: string;
  readonly transferFee: number;
  readonly transferType: string;
  readonly transferAmount: number;
  readonly beneficiaryBank: string;
  readonly transferAccount: string;
  readonly beneficiaryAccountNo: string;
}
