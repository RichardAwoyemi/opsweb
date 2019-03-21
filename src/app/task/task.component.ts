import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../_services/util.service';
import { NGXLogger } from 'ngx-logger';

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
    private route: ActivatedRoute,
    private logger: NGXLogger
  ) { }

  @ViewChild('showReportModal') showReportModal: ElementRef;
  @ViewChild('showShareModal') showShareModal: ElementRef;
  @ViewChild('showApplyTaskModal') showApplyTaskModal: ElementRef;
  @ViewChild('showMessageModal') showMessageModal: ElementRef;

  ngOnInit() {
    this.task = this.route.params.subscribe(params => {
      this.id = params['id'];
   });
  }

  showReportOptions() {
    $(this.showReportModal.nativeElement).modal('show');
  }

  showShareOptions() {
    $(this.showShareModal.nativeElement).modal('show');
  }

  showEditOptions() {
    this.logger.debug('todo');
  }

  showApplyTask() {
    $(this.showApplyTaskModal.nativeElement).modal('show');
  }

  showMessage() {
    $(this.showMessageModal.nativeElement).modal('show');
  }
}
