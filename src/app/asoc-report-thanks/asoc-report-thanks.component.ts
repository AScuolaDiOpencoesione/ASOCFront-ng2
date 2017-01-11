import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-asoc-report-thanks',
  templateUrl: './asoc-report-thanks.component.html',
  styleUrls: ['./asoc-report-thanks.component.css']
})
export class AsocReportThanksComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  report 

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {this.report = +params['report'];});
  }

}
