import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  }

  addMultiple() {
    this.messageService.addAll([{ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' },
    { severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }]);
  }


  showSuccess(meesage: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: meesage });
  }

  showInfo(meesage: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: meesage });
  }

  showWarn(meesage: any) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: meesage });
  }

  showError(meesage: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: meesage });
  }

  clear() {
    this.messageService.clear();
  }

  ngOnInit(): void {
  }

}
