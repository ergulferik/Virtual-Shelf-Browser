import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { BookService, BookDto, bookTypeOptions, locationOptions } from '@proxy/books';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class BookComponent implements OnInit {
  book = { items: [], totalCount: 0 } as PagedResultDto<BookDto>;
  base64Data
  form: FormGroup;
  imageCtrl=false
  selectedBook = {} as any;

  authors$: Observable<any[]>;

  bookTypes = bookTypeOptions;

  physicalLocations = locationOptions;

  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private bookService: BookService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private sanitizer: DomSanitizer,
  ) {
    this.authors$ = bookService.getAuthorLookup().pipe(map((r) => r.items));
  }

  ngOnInit() {
    const bookStreamCreator = (query) => this.bookService.getList(query);

    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.book = response;
      response.items.forEach((element: any) => {
        element.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.coverImage}`);
      });
    });
  }

  createBook() {
    this.imageCtrl=false
    this.selectedBook = {} as BookDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editBook(id: string) {
    this.bookService.get(id).subscribe((book) => {
      this.imageCtrl=true
      this.selectedBook = book;
      this.selectedBook.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${book.coverImage}`);
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      authorId: [this.selectedBook.authorId || null, Validators.required],
      name: [this.selectedBook.name || null, Validators.required],
      type: [this.selectedBook.type || null, Validators.required],
      publishDate: [
        this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null,
        Validators.required,
      ],
      description: [this.selectedBook.description || null, Validators.required],
      physicalLocation: [this.selectedBook.physicalLocation || null, Validators.required],
      numberOfPage: [this.selectedBook.numberOfPage || null, Validators.required && Validators.min(0)],
      coverImage: [this.selectedBook.coverImage || null, Validators.required],
      image: [this.selectedBook.image || null]
      // price:"1",
    });
    debugger
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.base64Data = e.target.result.split(',')[1];

    };
    reader.readAsDataURL(file);
  }

  save() {
    
    if (this.form.invalid) {
      return;
    }
    if (this.base64Data) {
      this.form.value.coverImage = this.base64Data;
    }
    const request = this.selectedBook.id
      ? this.bookService.update(this.selectedBook.id, this.form.value)
      : this.bookService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', 'AbpAccount::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.bookService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
