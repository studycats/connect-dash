import { Injectable } from '@angular/core';
import { LearnerService } from './learner.service';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { BehaviorSubject, Observable, filter, first, tap } from 'rxjs';
import { AwsCredentialsService } from './aws-credentials.service';
import { LambdaService } from './lambda.service';

@Injectable({
  providedIn: 'root'
})
export class RecentExperienceService {

  private _words$ = new BehaviorSubject<any[]>([]);

  constructor(private learner: LearnerService,
              private lambda: LambdaService) {
    this.learner.learner$.subscribe(learner => {
      console.log('fetching learner recent experience', learner.username);
      this.fetchRecentExperience(learner.username);
    });
  }

  async fetchRecentExperience(username: string) {
    const result = await this.lambda.execute({
      // FunctionName: 'catagg-dev-student_recent_experience',
      FunctionName: 'catagg-prod-student_recent_experience',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        'path': 'awsSDKinvoke',
        'pathParameters': {
          'student_pin': username
        }
      })
    });

    // decode lambda response payload
    const payload = JSON.parse(new TextDecoder().decode(result.Payload as Uint8Array));
    // decode json strigified body, and parse the results the lambda is sending
    this.parseResults(JSON.parse(payload.body).data);
  }
  
  private removeDisplayDuplicates(items:any): [] {
    return items.reduce((unique:any, item:any) => {
      if (unique.findIndex((i:any) => i.display === item.display) === -1) {
        return [...unique, item];
      }
      return unique;
    }, []);
  }

  parseResults(results: any) {
    console.log('recent experience .....', results);

    const targets = results.word_accs ? this.removeDisplayDuplicates(results.word_accs) : [];
    const seen = results.seen ? this.removeDisplayDuplicates(results.seen) : [];

    let words = seen.map((item:any) => ({
      displayName: item.display,
      word: item.word,
      dateMS: item.date,
      p: null
    }))

    let result = words.concat(targets.map((item:any) => ({
      displayName: item.display,
      word: item.word,
      dateMS: item.date,
      p: item.acc
    })));

    console.log(result);

    this._words$.next(result);
  }

  get words$(): Observable<any[]> {
    return this._words$.pipe(
      filter(items => !!items)
    );
  }
}
