export type Content = {
    body: string;
    req_id: number;
    created_at: string;
};

export type EmailPayload = {
    sendTo: string;
    subject: string;
    body: string;
};

export type SendEmailRequest = {
    idempotencyKey?: string;
    content?: Content;
    payload: EmailPayload;
};
