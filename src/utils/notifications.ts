import PNotify from "pnotify/dist/es/PNotify";
import 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/es/PNotifyConfirm';
import 'pnotify/dist/es/PNotifyCallbacks';

export const ShowNotificationError = (title: string, text: string) => {
  PNotify.error({
    title: title,
    text: text
  });
}