export interface ITemplateNameItem {
  id: number;
  indexAnimation: number;
}

export interface IPayloadGetTemplateNameListRequest {
  offset?: number;
  isRefresh?: boolean;
  q?: string;
  callback?: {
    handleFail?: (error?: any) => void;
    handleSuccess?: () => void;
  };
}

export interface IPayloadGetTemplateNameListSuccess {
  data: ITemplateNameItem[];
  count: number;
  offset: number;
}
