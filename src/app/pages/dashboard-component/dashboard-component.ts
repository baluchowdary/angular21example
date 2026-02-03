import { Component, computed, effect, signal } from '@angular/core';
import { LoginServices } from '../../services/login-services';
import { DashBoardData } from '../../model/class/dash-board-data';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {

  // allUsers: any[] = [];
  allUsers = signal<DashBoardData[]>([]);

  // 2. Pagination State (Signals are better here for reactivity)
  currentPage = signal(1);
  pageSize = signal(3);

  // 3. Automatically updates whenever allUsers or pageSize changes
  totalPages = computed(() => {
    const total = Math.ceil(this.allUsers().length / this.pageSize());
    return total > 0 ? total : 1;
  });

  // 4. Automatically updates the list whenever data OR page changes
  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.allUsers().slice(start, end);
  });


  constructor(private loginServices: LoginServices) {
    effect(() => {
      if (this.currentPage() > this.totalPages()) {
        this.currentPage.set(this.totalPages());
      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  // Example of how you MUST update the data for expansion to work:
  addNewUser(newUser: any) {
    // This triggers the Dynamic Expansion
    this.allUsers.update(users => [...users, newUser]);
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    debugger;
    this.loginServices.loadAllUsers().subscribe((data: any[]) => {
      console.log('All Users Data:', data);
      console.log('All Users Data Length:', data.length);
      this.allUsers.set(data);
    });
  }


  //delete user
  onDeleteUser(userId: number) {
    debugger;
    this.loginServices.deleteUserRecord(userId).subscribe(() => {
      console.log(`User with ID ${userId} deleted successfully.`);
      // Update the local user list after deletion
      this.allUsers.update(users => users.filter(user => user.id !== userId));
    });
  }

}


