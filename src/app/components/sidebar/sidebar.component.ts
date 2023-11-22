import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  @Input() title: string = '';

  @HostListener('document:keyup', ['$event', 'this']) onDocumentClick(
    event: KeyboardEvent
  ) {
    if (event.key === 'Escape') {
      const sidebar = document.querySelectorAll('.sidebar-component.open');
      if (sidebar) {
        this.onCloseModal();
      }
    }
  }

  onCloseModal = () => {
    document.querySelectorAll('.sidebar-component').forEach((sidebar) => {
      if (sidebar) {
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
      }
    });
  };
}
