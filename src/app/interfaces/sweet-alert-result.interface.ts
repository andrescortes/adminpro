export interface ISweetAlertResult {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean;
    value?: any;
    dismiss?: string;
    dismissWith?: string;
}