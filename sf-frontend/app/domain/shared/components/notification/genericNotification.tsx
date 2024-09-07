import { notification } from 'antd';


export type NotifyProps = {
    message: string;
    description?: string;
    icon?: any;
    type?: 'success' | 'info' | 'warning' | 'error';
    position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "top" | "bottom"
    showProgress?: boolean;
    pauseOnHover?: boolean;
};

export const genericNotification = (props: NotifyProps) => {
    const { message, description = "", icon, type = 'info', position = 'topRight', showProgress = true, pauseOnHover = true } = props;
    notification[type]({
        message: message,
        description: description,
        placement: position,
        showProgress: showProgress,
        pauseOnHover: pauseOnHover,
        ...(icon && { icon: icon })
    });
}