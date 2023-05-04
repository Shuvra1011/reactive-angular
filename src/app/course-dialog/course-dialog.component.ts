import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError, first, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Observable, fromEvent, throwError} from 'rxjs';
import { BaseService } from '../@services/base.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;
    saveBtnClick$: Observable<Event>;
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private baseService: BaseService
        ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {
    }

    save(): void {
      const changes = this.form.value;
      this.baseService.saveCourse(this.course.id, changes).pipe(
        first(),
        tap((val)=>{
            console.log('val', val);
            this.dialogRef.close(val)
        })
      ).subscribe();

    }

    close() {
        this.dialogRef.close();
    }

}
