import {Injectable} from '@angular/core';
import {BaseWS} from './base-ws';
import {HttpClient} from '@angular/common/http';
import {IPremierLeague} from "../models/IPremierLeague";

@Injectable()
export class PremierLeagueWS extends BaseWS<IPremierLeague> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'premier-league');
  }

}
