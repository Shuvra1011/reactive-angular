import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, Subject, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { BaseService } from '../@services/base.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Subject<Course[]> = new Subject<Course[]>();

  advancedCourses$: Subject<Course[]> = new Subject<Course[]>();
  beginnerCourses: Course[];

  advancedCourses: Course[];
  courses$: Observable<Course[]>;


  constructor(private http: HttpClient, private dialog: MatDialog, private baseService: BaseService) {

  }

  ngOnInit() {
   this.reloadCourses();
  }

  reloadCourses() {
    this.courses$ = this.baseService.getCourses().pipe(
      map(courses => courses.sort(sortCoursesBySeqNo)),
      tap((courses)=>{
        const beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
        const advancedCourses = courses.filter(course => course.category === 'ADVANCED');
        this.beginnerCourses$.next(beginnerCourses);
        this.advancedCourses$.next(advancedCourses);
      })
    );
  }

 

}




