import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, from } from 'rxjs';
import { filter, first, mergeMap, tap } from 'rxjs/operators';
import { InvokeCommand, InvokeCommandInput, LambdaClient } from '@aws-sdk/client-lambda';
import { AwsCredentialsService } from './aws-credentials.service';

@Injectable({
  providedIn: 'root'
})
export class LambdaService {

  private _lambda$ = new BehaviorSubject<LambdaClient|null>(null);

  constructor(private credentials: AwsCredentialsService) {
    this.credentials.credentials$.subscribe(credentials => {
      this._lambda$.next(new LambdaClient({
        region: 'eu-central-1',
        credentials: {
          accessKeyId: credentials.AccessKeyId,
          secretAccessKey: credentials.SecretKey,
          sessionToken: credentials.SessionToken
        }
      }))
    });
  }

  public get client$(): Observable<LambdaClient> {
    return this._lambda$.pipe(
      filter((p): p is LambdaClient => !!p)
    )
  }

  /**
   * Use this if calling a lambda directly, uses parseAWSError to look for known errors.
   *
   * @param params
   * @returns {Promise<any>}
   */
  public async execute(params: InvokeCommandInput): Promise<any> {
    const command = new InvokeCommand(params);
    const observable$ = this.client$.pipe(
      first(),
      tap(c => console.log('lambda client', c)),
      mergeMap(client => from(client.send(command)))
    )

    return await firstValueFrom(observable$);
  }
}
