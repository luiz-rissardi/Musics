import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayListComponent } from './add-play-list.component';

describe('AddPlayListComponent', () => {
  let component: AddPlayListComponent;
  let fixture: ComponentFixture<AddPlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
