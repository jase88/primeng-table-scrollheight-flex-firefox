import { Component } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { NgStyle } from '@angular/common';

interface Person {
  id: string;
  age: number;
  name: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, SkeletonModule, NgStyle],
  templateUrl: './table.component.html',
  host: {
    class: 'flex h-full',
  },
})
export class TableComponent {
  virtualScrollItemSize =
    Number.parseFloat(getComputedStyle(document.documentElement).fontSize) *
    5.075;

  selection: Person | undefined;

  rows = 1000;

  data: Array<Person> = Array.from({ length: this.rows }).map((_, i) => ({
    id: i.toString(),
    age: i,
    name: `Person ${i}`,
  }));

  persons: Array<Person | undefined> = Array.from({ length: this.rows });

  protected handleLazyLoad(tableLazyLoadEvent: TableLazyLoadEvent) {
    const first = tableLazyLoadEvent.first ?? 0;
    const rows = tableLazyLoadEvent.rows ?? 0;

    setTimeout(
      () => {
        let loadedCars = this.data.slice(first, first + rows);

        // @ts-ignore
        Array.prototype.splice.apply(this.persons, [
          ...[first, rows],
          ...loadedCars,
        ]);

        tableLazyLoadEvent.forceUpdate?.();
      },
      Math.random() * 500 + 250,
    );
  }
}
