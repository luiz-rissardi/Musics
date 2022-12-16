import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefinirsenhaComponent } from './redefinirsenha.component';

describe('RedefinirsenhaComponent', () => {
  let component: RedefinirsenhaComponent;
  let fixture: ComponentFixture<RedefinirsenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedefinirsenhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedefinirsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
