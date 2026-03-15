export enum SubscriptionType {
    BASIC = 'basic',
    STANDARD = 'standard',
    PREMIUM = 'premium',
}

export interface SubscriptionData {
    subscriptionType: SubscriptionType;
    amount: number;
}

export interface SubscriptionResponse {
    message: string;
}
