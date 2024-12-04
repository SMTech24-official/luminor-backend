import {
    INotificationStatus,
    INotificationType,
  } from "./notification.interface";
  
  export const NotificationType: INotificationType[] = [
    "privateMessage",
   "offer"
  ];
  
  export const NotificationStatus: INotificationStatus[] = ["seen", "unseen"];