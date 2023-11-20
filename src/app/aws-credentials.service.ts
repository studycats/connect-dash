import { Injectable } from '@angular/core';
import { CognitoIdentityClient, GetCredentialsForIdentityCommand, GetIdCommand } from '@aws-sdk/client-cognito-identity';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject, filter, map } from 'rxjs';
import { from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AwsCredentialsService {

  private cognitoClient = new CognitoIdentityClient({
    region: 'eu-central-1'
  });

  public credentials$ = new BehaviorSubject<any>(null);

  constructor(private msalService: MsalService) {
    this.msalService.acquireTokenSilent({
      // scopes: ['5fb882ba-6799-46fc-be0e-0d0a98a679d9'],
      scopes: ['8047db93-ce55-4d03-823e-0fa6882aefc1'],
      account: this.msalService.instance.getAllAccounts()[0],
      
    }).pipe(
      catchError(err => {
        console.log('what now???', err);
        // throw err;
        return this.msalService.acquireTokenPopup({
          // scopes: ['5fb882ba-6799-46fc-be0e-0d0a98a679d9'],
          scopes: ['8047db93-ce55-4d03-823e-0fa6882aefc1'],
          account: this.msalService.instance.getAllAccounts()[0]
        })
      }),
      filter((tokenResponse:any) => !!tokenResponse?.accessToken),
      map((tokenResponse:any) => tokenResponse.accessToken),
      mergeMap((accessToken:string) => from(this.getCognitoIdentityId(accessToken))),
      filter(([accessToken, identityId]:[string, string]) => !!identityId && !!accessToken),
      mergeMap(([accessToken, identityId]:[string, string]) => from(this.getCredentialsForIdentity(identityId, accessToken)))
    ).subscribe(credentials => {
      console.log('OMG! CREDENTIALS!!!!', credentials);
      this.credentials$.next(credentials);
    });
  }

  private async getCognitoIdentityId(accessToken: string): Promise<[string, string]> {
//    const command = new GetIdCommand({
//      IdentityPoolId: 'eu-central-1:830fb402-4b2f-480f-97a9-8709bf3b5bd4',
//      Logins: {
//        'login.dev.studycat.com/tfp/43f01f58-80b1-4f51-a1fd-a0bd2c911de5/b2c_1a_signuporsignin_localsocial/v2.0': accessToken
//      }
//    });
    const command = new GetIdCommand({
      IdentityPoolId: 'eu-central-1:275c1233-fee1-4350-b76b-4a400840c391',
      Logins: {
        // 'login.dev.studycat.com/tfp/43f01f58-80b1-4f51-a1fd-a0bd2c911de5/b2c_1a_signuporsignin_localsocial/v2.0': accessToken
        'login.studycat.com/tfp/bb906b88-7e38-4f09-8e8e-a6805c72675a/b2c_1a_signuporsignin_localsocial/v2.0': accessToken
        // 'login.studycat.com/studycatcom.onmicrosoft.com/b2c_1a_signuporsignin_localsocial/v2.0': accessToken
      }
    });


    const result = await this.cognitoClient.send(command);
    if (!result?.IdentityId) {
      throw new Error('No identity id');
    }
    console.debug('cognito get identity result', result);

    return [accessToken, result.IdentityId];
  }

  private async getCredentialsForIdentity(identityId: string, accessToken: string): Promise<any> {
    const command = new GetCredentialsForIdentityCommand({
      IdentityId: identityId,
      Logins: {
        // 'login.dev.studycat.com/tfp/43f01f58-80b1-4f51-a1fd-a0bd2c911de5/b2c_1a_signuporsignin_localsocial/v2.0': accessToken 
        // 'login.studycat.com/studycatcom.onmicrosoft.com/b2c_1a_signuporsignin_localsocial/v2.0': accessToken
        'login.studycat.com/tfp/bb906b88-7e38-4f09-8e8e-a6805c72675a/b2c_1a_signuporsignin_localsocial/v2.0': accessToken
      }
    });

    const result = await this.cognitoClient.send(command);
    console.debug('cognito get credentials result', result);
    return result?.Credentials;
  }
}
