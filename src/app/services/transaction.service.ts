import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ClientResponse} from '../models/client-response';
import {TransactionListResponse} from '../models/transaction-list-response';
import {ClientRequest} from '../models/client-request';
import {TransactionRequest} from '../models/transation-request';
import {TransactionResponse} from '../models/transaction-response';
import {TransactionListRequest} from '../models/transaction-list-request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  searchResults = new Subject<TransactionListResponse>();
  currentPage = new Subject<number>();


  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.currentPage.next(1);
  }

  public transaction(request: TransactionRequest): Observable<TransactionResponse> {
    return this.httpClient.post<TransactionResponse>(`${environment.url}transaction`, request);
  }

  public client(request: ClientRequest): Observable<ClientResponse> {
    return this.httpClient.post<ClientResponse>(`${environment.url}client`, request);
  }

  onResults(): Observable<TransactionListResponse> {
    return this.searchResults.asObservable();
  }

  onCurrentPageChange(): Observable<number> {
    return this.currentPage.asObservable();
  }

  search(request: TransactionListRequest) {
    return this.httpClient.post<TransactionListResponse>(`${environment.url}transaction/list`, request).subscribe(results =>
      this.searchResults.next(results)
    );
  }

}
