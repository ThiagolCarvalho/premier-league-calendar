import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export class BaseWS<T> {
  protected _url: string;

  constructor(private _httpClient: HttpClient, private url: string) {
    this._url = `http://localhost:3000/api/${url}`;
  }

  public getAll(): Observable<T> {
    return this._httpClient.get<T>(`${this._url}/`);
  }
}
