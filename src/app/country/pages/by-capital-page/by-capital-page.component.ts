import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  imports: [],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  onSearch(value: string) {
    console.log({ value });

  }
}
