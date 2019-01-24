import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  id: number;
  task: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  @ViewChild('showReportModal') showReportModal: ElementRef;
  @ViewChild('showShareModal') showShareModal: ElementRef;
  @ViewChild('showApplyTaskModal') showApplyTaskModal: ElementRef;

  ngOnInit() {
    this.task = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
   });
  }

  showReportOptions() {
    $(this.showReportModal.nativeElement).modal('show');
  }

  showShareOptions() {
    $(this.showShareModal.nativeElement).modal('show');
  }

  showEditOptions() {
    console.log('todo');
  }

  showApplyTask() {
    $(this.showApplyTaskModal.nativeElement).modal('show');
  }
}
