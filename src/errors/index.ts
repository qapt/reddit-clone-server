export class ErrorResponse extends Error {
    message!: string;
    statusCode!: number;
    type!: string;
    timestamp!: Date;
    details: string[];

    constructor(details: string[]) {
        super();
        this.details = details;
        this.timestamp = new Date(Date.now());
    }
}

export class NotFound extends ErrorResponse {
    constructor(details: string[]) {
        super(details);
        this.type = 'NOT_FOUND';
        this.message = 'Resource was not found';
        this.statusCode = 404;
    }
}

export class Unauthorized extends ErrorResponse {
    constructor(details: string[]) {
        super(details);
        this.type = 'UNAUTHORIZED';
        this.message = 'Access was denied due to failed authorization';
        this.statusCode = 401;
    }
}

export class BadRequest extends ErrorResponse {
    constructor(details: string[]) {
        super(details);
        this.type = 'BAD_REQUEST';
        this.message = 'Bad request';
        this.statusCode = 400;
    }
}

export class InvalidInput extends BadRequest {
    constructor(details: string[]) {
        super(details);
        this.message = 'Error with client data input';
    }
}

export class ServerError extends ErrorResponse {
    constructor() {
        super(['']);
        this.type = 'SERVER_ERROR';
        this.message = 'Something went wrong';
        this.statusCode = 500;
    }
}
