import { Injectable } from '@angular/core';
import { AwsCredentialsService } from './aws-credentials.service';
import { AwsClient } from 'aws4fetch';
import { Observable, filter, map, tap } from 'rxjs';

export class ConnectClient {
    // private _host = settings.connectApiHost;
    // private _host = 'connect.api.dev.studycat.com';
    private _host = 'connect.api.studycat.com';

    constructor(private _awsClient: AwsClient) {
    }

    public async fetch(resource: string, params: any): Promise<Object> {
        const result = await this._awsClient.fetch(`https://${this._host}${resource}`, params);
        if (result && result.status >= 200 && result.status < 300) {
            return result.json();
        } else {
            throw new Error('Failed to fetch');
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class ConnectApiService {

    constructor(private credentials: AwsCredentialsService) {
    }

    public get client$(): Observable<ConnectClient> {
        return this.credentials.credentials$.pipe(
            filter(credentials => !!credentials),
            map(credentials => new AwsClient({
                accessKeyId: credentials.AccessKeyId,
                secretAccessKey: credentials.SecretKey,
                sessionToken: credentials.SessionToken,
                service: 'execute-api',
                region: 'eu-central-1'
            })),
            map(client => new ConnectClient(client))
        );
    }
}