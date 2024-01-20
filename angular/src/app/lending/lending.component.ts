import { Component, OnInit } from '@angular/core';
import { ConfigStateService, ListService, PagedResultDto } from '@abp/ng.core';
import { AuthorService, AuthorDto } from '@proxy/authors';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { LendingDto, LendingService } from '@proxy/lendings';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class LendingComponent implements OnInit {
  lending = {items: [], totalCount:0} as PagedResultDto<LendingDto>;
  form: FormGroup;
  selectedLending = {} as LendingDto;
  userRole:any;
  users$: Observable<any[]>;
  userName:any;
  books$: Observable<any[]>;
  userBool = true;
  lenderName:any;
  isModalOpen = false;

  constructor(
    public readonly list:ListService,
    private lendingService: LendingService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private config: ConfigStateService
  ){
    this.config.getOne$("currentUser").subscribe(currentUser => {
      this.userName = currentUser.userName;
      this.lenderName = currentUser.name;
      this.userRole = currentUser.roles[0]
   })
    this.books$ = lendingService.getBookLookup().pipe(map((r) => r.items));
    this.users$ = lendingService.getUserLookup().pipe(map((r) => r.items));
  }

  ngOnInit() {
    const lendingStreamCreator = (query) => this.lendingService.getList(query);

    this.list.hookToQuery(lendingStreamCreator).subscribe((response) => {
      this.lending = response;
      if(this.userRole != 'admin' && this.userRole != 'Manager'){
        this.userBool = false
        this.lending.items = this.lending.items.filter((x) => x.userName == this.userName)
      }
    })
  }

  createLending(){
    this.selectedLending = {} as LendingDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editLending(id: string){
    this.lendingService.get(id).subscribe((lending) => {
      this.selectedLending = lending;
      this.buildForm();
      this.isModalOpen = true;
    })
  }

  buildForm2(){
    this.form = this.fb.group({
      userName: [this.selectedLending.userName || null, Validators.required],
      bookId: [this.selectedLending.bookId || null, Validators.required],
      startDate: [
        this.selectedLending.startDate ? new Date(this.selectedLending.startDate): null,
        Validators.required
      ],
      endDate: [
        this.selectedLending.endDate ? new Date(this.selectedLending.endDate): null,
        Validators.required
      ],
      isDelivered: [this.selectedLending.isDelivered || null]
    })
  }

  buildForm(){
    this.form = this.fb.group({
      userName: [this.selectedLending.userName || null, Validators.required],
      bookId: [this.selectedLending.bookId || null, Validators.required],
      startDate: [
        this.selectedLending.startDate ? new Date(this.selectedLending.startDate): null,
        Validators.required
      ],
      endDate: [
        this.selectedLending.endDate ? new Date(this.selectedLending.endDate): null,
        Validators.required
      ]
    })
  }

  isDeliveredFunc(id: string) {

    this.lendingService.get(id).subscribe((lending) => {
      this.selectedLending = lending;
      this.selectedLending.isDelivered = true
      this.buildForm2()
      this.save()
    })
  }

  save(){
    if(this.form.invalid){
      return;
    }
    this.form.value.lenderName = this.lenderName
    const request = this.selectedLending.id
      ? this.lendingService.update(this.selectedLending.id, this.form.value)
      : this.lendingService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset()
      this.list.get();
    })
  }
  delete(id: string){
    this.confirmation.warn('::AreYouSureToDelete', 'AbpAccount::AreYouSure').subscribe((status) => {
      if(status === Confirmation.Status.confirm){
        this.lendingService.delete(id).subscribe(() => this.list.get())
      }
    })
  }
}
