import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  sub: any;
  constructor(private route: ActivatedRoute, private search: SearchService) { }
  word: any;
  s: String;
  a: Boolean;
  ngOnInit() {
    this.a = false;
    this.sub = this.route.params.subscribe(params => {
      this.s = params['query'];
      this.search1(this.s);
    });

  }
  search1(s: String) {
    this.search.search(s).subscribe(
      data => {
        if (data._body === 'null')
          this.a = false;
          else this.a = true;
        this.word = JSON.parse(data._body);
      },
      error => console.log(error),
      () => {

      }
    );
  }
}
