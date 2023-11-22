import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  @Input() title: string = '';

  onCloseModal = () => {
    document.querySelectorAll('.sidebar-component').forEach((sidebar) => {
      if (sidebar) {
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
      }
    });
  };
}
