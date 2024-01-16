import { generateToolkitAction } from 'utils/common';

export const followAdvisor = generateToolkitAction<number>('Advisor/followAdvisor');

export const unFollowAdvisor = generateToolkitAction<number>('Advisor/unFollowAdvisor');

export const initAdvisorData = generateToolkitAction('Advisor/initAdvisorData');
