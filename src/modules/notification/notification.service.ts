
import { ENUM_NOTIFICATION_STATUS } from "../../enums/notificationStatus";
import { INotification } from "./notification.interface";
import { Notification } from "./notification.model";

const createNotification = async (payload: INotification) => {
  const result = await Notification.create(payload);
  return result;
};

const getUserNotification = async (
  recipient: string,
  status: string,
  type: string
) => {
  let filters: any = {};

  if (status && recipient && type) {
    filters.recipient = recipient;
    filters.status = status;
    filters.type = type;
  } else if (status && recipient) {
    filters.recipient = recipient;
    filters.status = status;
  } else if (recipient && type) {
    filters.recipient = recipient;

    filters.type = type;
  } else if (recipient) {
    filters.recipient = recipient;
  }

  const result = await Notification.find(filters).sort({ createdAt: -1 });
  return result;
};
const updateNotification = async (id: string) => {
  const result = await Notification.findOneAndUpdate(
    { _id: id },
    { status: ENUM_NOTIFICATION_STATUS.SEEN },
    {
      new: true,
    }
  );
  return result;
};
export const NotificationService = {
  createNotification,
  getUserNotification,
  updateNotification,
};