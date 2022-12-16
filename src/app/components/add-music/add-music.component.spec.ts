import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicComponent } from './add-music.component';

describe('AddMusicComponent', () => {
  let component: AddMusicComponent;
  let fixture: ComponentFixture<AddMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMusicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});