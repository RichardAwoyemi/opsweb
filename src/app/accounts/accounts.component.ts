import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

declare var $;

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: [ './accounts.component.css' ]
})
export class AccountsComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  showOldTransaction = false;

  @ViewChild('sendBitcoinModal') sendBitcoinModal: ElementRef;
  @ViewChild('receiveBitcoinModal') receiveBitcoinModal: ElementRef;
  @ViewChild('sendEthereumModal') sendEthereumModal: ElementRef;
  @ViewChild('receiveEthereumModal') receiveEthereumModal: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);
  }

  showOlderTransactions() {
    this.showOldTransaction = true;
  }

  hideOlderTransactions() {
    this.showOldTransaction = false;
  }

  showSendBitcoinModal() {
    $(this.sendBitcoinModal.nativeElement).modal('show');
  }

  showReceiveBitcoinModal() {
    $(this.receiveBitcoinModal.nativeElement).modal('show');
  }

  showSendEthereumModal() {
    $(this.sendEthereumModal.nativeElement).modal('show');
  }

  showReceiveEthereumModal() {
    $(this.receiveEthereumModal.nativeElement).modal('show');
  }
}
