import { notifications, type NotificationData } from "@mantine/notifications";

type NOTI_TYPE = "success" | "warning" | "error"
const noti: Record<NOTI_TYPE, NotificationData> = {
    success: {
        title: "Success",
        message: "Handle success",
        color: "green"
    },
    warning: {
        title: "Warning",
        message: "Handle warning",
        color: "yellow"
    },
    error: {
        title: "Error",
        message: "Handle error",
        color: "red"
    },
}

export const showNoti = (type: NOTI_TYPE) => {
    notifications.show(noti[type]);
}