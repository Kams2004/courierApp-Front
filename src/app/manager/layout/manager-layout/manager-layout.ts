import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagerSidebar } from '../manager-sidebar/manager-sidebar';
import { ManagerHeader } from '../manager-header/manager-header';

@Component({
  selector: 'app-manager-layout',
  imports: [RouterOutlet, ManagerSidebar, ManagerHeader],
  templateUrl: './manager-layout.html',
  styleUrl: './manager-layout.scss',
})
export class ManagerLayout {

}
