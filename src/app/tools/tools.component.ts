import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ModalComponent } from '../_modals/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../_services/excel.service';
import { PdfService } from '../_services/pdf.service';
import { CsvService } from '../_services/csv.service';

declare var $;

@Component({
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [DatePipe]
})
export class ToolsComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  currentDate = new Date();
  formattedCurrentDate = '';
  data: any = [
    {
      date: 'Jan 11, 2019',
      type: 'Transfer to',
      name: 'Richard Awoyemi',
      amount: '0.1 BTC (284.69 GBP)',
      status: 'IN PROGRESS'
    },
    {
      date: 'Jan 09, 2019',
      type: 'Payment from',
      name: 'Mofe Salami',
      amount: '0.1 BTC (284.69 GBP)',
      status: 'COMPLETED'
    }
  ];

  @ViewChild('showDetailsModal') showDetailsModal: ElementRef;
  @ViewChild('showExportModal') showExportModal: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public modalService: NgbModal,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private csvService: CsvService,
    private datePipe: DatePipe
  ) {
    this.formattedCurrentDate = this.datePipe.transform(this.currentDate, 'yyyyMMdd');
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  // createNewAddress() {
  //   const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
  //   modalReference.componentInstance.header = 'Oops!';
  //   modalReference.componentInstance.message = 'This feature is currently under construction. ' +
  //     'For the time being, you are only allowed a single address.';
  // }

  showDetails() {
    $(this.showDetailsModal.nativeElement).modal('show');
  }

  showExportOptions() {
    $(this.showExportModal.nativeElement).modal('show');
  }

  exportToExcel() {
    this.excelService.exportAsExcelFile(this.data, this.formattedCurrentDate + '_balanceHistory');
  }

  exportToCsv() {
    this.csvService.exportAsCsvFile(this.data, this.formattedCurrentDate + '_balanceHistory');
  }

  exportToPdf() {
    const data = document.getElementById('contentToExport');
    this.pdfService.exportAsPdFile(data, this.formattedCurrentDate + '_balanceHistory');
  }
}
