import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | ''

export interface SortEvent {
  column: string;
  direction: string;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.desc]': 'direction === "desc"'
  }
})
export class SortableHeaderDirective {

  @Input() sortable = '';
  // @Input()
  direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  constructor() { }
  // constructor(private el: ElementRef) {
  //    this.el.nativeElement...
  //  } ovako dobijamo referencu na host element, tj referencu na th tag

  @HostBinding('class.asc')
  get ascClass() {
    return this.direction === 'asc';
  }

  // @HostBinding('class.desc')
  // get descClass() {
  //   return this.direction === 'desc';
  // }

  @HostListener('click')
  onSort() {
    if (!this.direction) {
      this.direction = 'asc';
    } else if (this.direction === 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = '';
    }
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
