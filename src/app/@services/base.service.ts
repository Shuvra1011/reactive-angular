import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(private http: HttpClient) { }

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>("api/courses").pipe(
            map(res => res['payload'])
        )
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        return this.http.put(`/api/courses/${courseId}`, changes).pipe(
            map(res => res)
        )
    }
}