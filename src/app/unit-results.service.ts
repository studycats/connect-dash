import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LambdaService } from './lambda.service';
import { Learner, LearnerService } from './learner.service';
import { ActivityRoute } from '@studycats/lms-sdk/types/activities';
import { ProductNames } from '@studycats/lms-sdk/types/products';

@Injectable({
  providedIn: 'root'
})
export class UnitResultsService {

  private _learner:any;

  private _words$ = new BehaviorSubject<any[]>([]);
  private _score$ = new BehaviorSubject<number>(0);

  constructor(private lambda: LambdaService,
              private learner: LearnerService) {  
    this.learner.learner$.subscribe(s => {
      this._learner = s;
    })
  }

  private async _fetch(unit: string): Promise<any> {
    let ar = new ActivityRoute({
      unitName: unit,
      product: ProductNames.FE,
      curriculumVersion: '2',
    });

    if (this._learner) {
      this._words$.next([]);
      this._score$.next(0);

//      return await this.lambda.execute({
//        FunctionName: 'catagg-dev-unit_or_module_results',
//        Payload: JSON.stringify({
//          'path': 'awsSDKInvoke',
//          'pathParameters': {
//            'class_code': this._learner.class_code,
//            'prefix': ar.unitPath
//          }
//        })
//      }).then(results => {
      Promise.resolve().then(() => {
        //let body = JSON.parse(results.body);
        let body = {
          data: {
            student_scores: [70],
            words: [ 'word1', 'word2'],
            word_scores: [ 95, 70 ]
          }
        }

        const result = {
          score: 0,
          word_scores: [] as number[],
          words: [] as string[]
        }

        if (body.data) {
          // slight impedance between unit results for a class and for a student
          if (body.data.student_scores && body.data.student_scores.length){
            result.score = body.data.student_scores[0];
            this._score$.next(result.score);
          }
          result.word_scores = body.data.word_scores;
          result.words = body.data.words;

          if (body.data.words && body.data.words.length) {
            let words = [];
            for (let x=0; x< result.words.length; x++) {
              let w = {
                name: result.words[x],
                score: result.word_scores[x],
              }
              words.push(w);
            }
            this._words$.next(words);
          }
        }

        console.log(result)
        return body.data;
      })
    } else {
      console.log('no student to fetch unit results for');
      return {}
    }
  }

  public async fetch(unit: string): Promise<any> {
    return this._fetch(unit);
  }

  public get words$(): Observable<any[]> {
    return this._words$;
  }
  
  public get score$(): Observable<number> {
    return this._score$;
  }
}
