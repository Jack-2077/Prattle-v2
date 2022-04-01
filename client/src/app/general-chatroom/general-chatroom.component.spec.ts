import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralChatroomComponent } from './general-chatroom.component';

describe('GeneralChatroomComponent', () => {
  let component: GeneralChatroomComponent;
  let fixture: ComponentFixture<GeneralChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralChatroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
