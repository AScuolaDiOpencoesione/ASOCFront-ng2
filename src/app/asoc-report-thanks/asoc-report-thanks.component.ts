import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-asoc-report-thanks',
  templateUrl: './asoc-report-thanks.component.html',
  styleUrls: ['./asoc-report-thanks.component.css']
})
export class AsocReportThanksComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  report;
  author;
  mode;
  
  ngOnInit() {
    this.report = this.route.snapshot.params["report"];
    this.author = this.route.snapshot.params["author"];
    this.mode = this.route.snapshot.params["mode"];
  }

}
