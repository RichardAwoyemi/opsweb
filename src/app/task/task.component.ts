import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  id: number;
  private task: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.task = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
   });
  }
}
