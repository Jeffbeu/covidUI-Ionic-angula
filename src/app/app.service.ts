//criando o arquivo que ira pega as informações da api 
import {Injectable} from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()

export class AppService{
    isCookieAccepted = false;
    private httpOptions: any;

    constructor(private http: HttpClient){
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'


            })
        };

    }
    getData(){
        const requestURL = 'https://api.covid19api.com/summary';
        return this.http.get(requestURL, this.httpOptions);
    }
}