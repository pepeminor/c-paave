import config from 'config';
import { IGenerateJSParams } from './IndicatorModal.type';

export const generateJS = (params: IGenerateJSParams) => {
  let result = `window['${config.widgetName}'].activeChart().createStudy(`;
  result += `'${params.name}',`;
  result += `${params.forceOverlay ?? 'false'},`;
  result += `${params.lock ?? 'false'},`;
  result += `${params.inputs ? JSON.stringify(params.inputs) : 'undefined'},`;
  result += params.callBackName
    ? `(entityId) => window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ADD', studyName: '${params.callBackName}', entityId })),`
    : 'undefined,';
  result += params.overrides ? JSON.stringify(params.overrides) : 'undefined,';
  result += ');';
  return result;
};
