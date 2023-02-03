import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})


export class PersonService {

  constructor(
    private http: HttpClient,
    public config: ConfigService) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private endPoint: string = this.config.endPoint + 'api/Person/';
 
  PersonAdd(data:any): Observable<any> { 
    return this.http.post<any>(this.endPoint + 'insertPerson', data, httpOptions);
  }

  PersonEdit(data:any): Observable<any> { 
    return this.http.put<any>(this.endPoint + 'updatePerson', data, httpOptions);
  }

  PersonDelete(personId: number, userRole:string): Observable<any> { 
    const params = new HttpParams().set('personId', personId).set('userRole',userRole);
    return this.http.delete<any>(this.endPoint + 'deletePerson', { params });
  }

  PersonView(): Observable<any> {  
    return this.http.get(this.endPoint + 'selectPerson' )
  }

  UserGroupsView(): Observable<any> {  
    return this.http.get(this.endPoint + 'selectUserGroups' )
  }

  PrivilegesView(): Observable<any> {  
    return this.http.get(this.endPoint + 'selectPrivileges' )
  }

  
}
