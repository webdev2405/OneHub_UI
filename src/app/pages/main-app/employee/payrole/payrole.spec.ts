import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payrole } from './payrole';

describe('Payrole', () => {
  let component: Payrole;
  let fixture: ComponentFixture<Payrole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Payrole]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Payrole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
