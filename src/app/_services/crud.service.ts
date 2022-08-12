import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class CRUDService {
    constructor(private http: HttpClient) {}

    list(): Observable<any> {
        return this.http.get(`${baseUrl}/posts/`, httpOptions);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${baseUrl}/posts/${id}/`, httpOptions);
    }

    create(params: any) {
        return this.http.post(`${baseUrl}/posts/`, params, httpOptions);
    }

    update(id: number, params: any): Observable<any> {
        return this.http.put(`${baseUrl}/posts/${id}/`, params, httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${baseUrl}/posts/${id}/`, httpOptions);
    }
}
