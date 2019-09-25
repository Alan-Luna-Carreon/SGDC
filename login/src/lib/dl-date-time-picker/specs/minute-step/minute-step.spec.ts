/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {Component, DebugElement, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {DlDateTimeNumberModule} from '../../../core';
import {DlDateTimePickerComponent} from '../../dl-date-time-picker.component';
import {DlDateTimePickerModule} from '../../dl-date-time-picker.module';

@Component({
  template: '<dl-date-time-picker [minuteStep]="minuteStep" startView="minute"></dl-date-time-picker>'
})
class MinuteStepComponent {
  minuteStep = 1;
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
}

@Component({
  template: '<dl-date-time-picker [minuteStep]="minuteStep" startView="minute"></dl-date-time-picker>'
})
class UndefinedMinuteStepComponent {
  minuteStep: number;  // intentionally did not assign value
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
}

describe('DlDateTimePickerComponent minuteStep', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
        imports: [
          FormsModule,
          DlDateTimeNumberModule,
          DlDateTimePickerModule,
        ],
        declarations: [
          MinuteStepComponent,
          UndefinedMinuteStepComponent,
        ]
      }
    ).compileComponents();
  }));

  describe('defined', () => {
    let component: MinuteStepComponent;
    let fixture: ComponentFixture<MinuteStepComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(MinuteStepComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should step one minute as configured', () => {
      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements.length).toBe(60);
      expect(minuteElements[0].nativeElement.textContent).toContain(':00');
      expect(minuteElements[59].nativeElement.textContent).toContain(':59');
    });

    it('should step 5-minutes if set to undefined', () => {
      component.minuteStep = undefined;
      fixture.detectChanges();

      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements.length).toBe(12);
      expect(minuteElements[0].nativeElement.textContent).toContain(':00');
      expect(minuteElements[11].nativeElement.textContent).toContain(':55');
    });

    it('should step 5-minutes if set to null', () => {
      component.minuteStep = null;
      fixture.detectChanges();

      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements.length).toBe(12);
      expect(minuteElements[0].nativeElement.textContent).toContain(':00');
      expect(minuteElements[11].nativeElement.textContent).toContain(':55');
    });

    it('should change to 15-minute step after config change', () => {
      component.minuteStep = 15;
      fixture.detectChanges();

      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements.length).toBe(4);
      expect(minuteElements[0].nativeElement.textContent).toContain(':00');
      expect(minuteElements[3].nativeElement.textContent).toContain(':45');
    });

    it('should render all minute step values between 1 and 59', () => {
      const stepValues = new Array(59)
        .fill(0)
        .map((value, index) => index + 1);

      stepValues.forEach((minuteStep) => {
        component.minuteStep = minuteStep;
        fixture.detectChanges();

        const expectedMinuteElements = Math.ceil(60 / minuteStep);
        const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
        expect(minuteElements.length).toBe(expectedMinuteElements);
        expect(minuteElements[0].nativeElement.textContent).toContain(':00');
      });
    });
  });

  describe('undefined', () => {
    let component: UndefinedMinuteStepComponent;
    let fixture: ComponentFixture<UndefinedMinuteStepComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(UndefinedMinuteStepComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should default to 5-minute step', () => {
      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements.length).toBe(12);
      expect(minuteElements[0].nativeElement.textContent).toContain(':00');
      expect(minuteElements[11].nativeElement.textContent).toContain(':55');
    });
  });
});
