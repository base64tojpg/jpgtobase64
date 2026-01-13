import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JpgToBase64 } from './jpg-to-base64';

describe('JpgToBase64', () => {
  let component: JpgToBase64;
  let fixture: ComponentFixture<JpgToBase64>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JpgToBase64]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JpgToBase64);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
