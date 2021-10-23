import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

export class BaseWS<T> {
  protected _url: string;

  constructor(private _httpClient: HttpClient, private url: string) {
    this._url = `${environment.apiURL}/${url}`;
  }

  public getAll(): Observable<T> {
    return this._httpClient.get<T>(`${this._url}/`);
  }
}
