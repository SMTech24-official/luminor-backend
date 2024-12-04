import {
    INotificationStatus,
    INotificationType,
  } from "./notification.interface";
  
  export const NotificationType: INotificationType[] = [
    "privateMessage",
    "joinTeamStatusUpdate",
    "joinTeamRequestStatus",
    "updateCreateTeam",
    "deleteCreateTeam",
  ];
  
  export const NotificationStatus: INotificationStatus[] = ["seen", "unseen"];