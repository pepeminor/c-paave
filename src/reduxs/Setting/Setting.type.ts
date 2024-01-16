export interface IDefaultAccount {
  [userId: string]: string;
}

export enum NotificationType {
  aiRating = 'aiRating',
  theme = 'theme',
  vnindexReturns = 'vnindexReturns',
  pinnedNews = 'pinnedNews',
}
