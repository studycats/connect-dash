import { Component } from '@angular/core';
import { LearnerService } from '../learner.service';
import { filter } from 'rxjs';

export class AggregateProps {
  average_score: number;
  activity_count: number;
  duration: number;
  average_duration: number;
  average_daily_duration: number;
  average_student_duration: number;
  progress: number;
  word_count?: number;
  student_scores?: number;
  num_classes?: number;
  num_schools?: number;
  num_students?: number;
  num_teachers?: number;
  key?: any;
  day?: string;
  week?: string;
  month?: string;

  constructor() {
    this.average_score = 0;
    this.activity_count = 0;
    this.duration = 0;
    this.average_duration = 0;
    this.average_daily_duration = 0;
    this.average_student_duration = 0;
    this.progress = 0;
  }
}

export class Aggregates {
  public all_time: AggregateProps;
  public daily: Array<AggregateProps>;
  public weekly: Array<AggregateProps>;
  public monthly: Array<AggregateProps>;

  public constructor() {
    this.all_time = {
      activity_count: 0,
      average_duration: 0,
      average_daily_duration: 0,
      average_student_duration: 0,
      average_score: 0,
      duration: 0,
      progress: 0,
      word_count: 0,
      student_scores: 0,
    };
    this.daily = [];
    this.monthly = [];
    this.weekly = [];
  }
}

@Component({
  selector: 'app-aggregates-chart',
  templateUrl: './aggregates-chart.component.html',
  styleUrls: ['./aggregates-chart.component.scss']
})
export class AggregatesChartComponent {
  public graph = {
    data: [{x: [], y: [], type: 'bar'}],
    layout: {
      autosize: true,
      xaxis:{'tickformat':'%b %d %Y' },
      yaxis:{ 'title':"",'ticksuffix':'',rangemode:'nonnegative'}
    },
  };

  private dataDailyAverageDuration = [{x: [], y: [], type: 'bar'}];

  constructor(private learner: LearnerService) { }

  ngOnInit() {
    this.learner.learner$.pipe(
      filter(l => !!l.aggregates)
      ).subscribe(l => {
      this._deriveGraphData(l.aggregates);
      this.graph.data = this.dataDailyAverageDuration;
      //@ts-ignore
      this.graph.data[0]['marker'] = {color:'#8935c1'};
      this.graph.layout.yaxis.title='Minutes';
      this.graph.layout.yaxis.ticksuffix = '';
    })
  }

  private _deriveGraphData(aggregates: Aggregates) {
    const days:any = [];
    const dailyAverageDuration:any = [];

    if (aggregates) {
      aggregates.daily.forEach(item => {
        days.push(item.day);
        dailyAverageDuration.push(Math.round(item.average_duration));
      });
    }

    // now assign, thus not doing too much
    // change detection work.
    this.dataDailyAverageDuration[0].x = days;
    this.dataDailyAverageDuration[0].y = dailyAverageDuration;
  };

}
