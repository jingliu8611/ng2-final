import {Component, OnInit, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';

@Component({
    selector: 'app-chart-config',
    templateUrl: './chart-config.component.html',
    styleUrls: ['./chart-config.component.scss']
})
export class ChartConfigComponent implements OnInit, AfterViewInit {

    @ViewChild('themeCircle') themeCircleEl: ElementRef;
    @ViewChild('downloadBtn') downloadBtnEl: ElementRef;
    @Output() closeEvent: EventEmitter<any> = new EventEmitter();
    chartConfigForm: FormGroup;
    sourceTypes = [
        'API',
        'JSON',
        'CSV'
    ];
    intervals = [
        '1 min',
        '5 min',
        '30 min'
    ];
    themes = [
        'Light Blue',
        'Lavender Blush',
        'Rosy Brown'
    ];

    apiTemplate = 'http://example.api.com/usernames/';
    jsonTemplate = {
        'id': 2,
        'name': 'An ice sculpture',
        'price': 12.50,
        'tags': ['cold', 'ice'],
        'dimensions': {
            'length': 7.0,
            'width': 12.0,
            'height': 9.5
        },
        'warehouseLocation': {
            'latitude': -78.75,
            'longitude': 20.4
        }
    };
    csvTemplate = 'coming soon';

    constructor(private formBuilder: FormBuilder) {
        this.chartConfigForm = formBuilder.group({
            'title': ['', Validators.required],
            'source': ['', Validators.required],
            'new-filter': [''],
            'filters': formBuilder.array([
                ['testFilter1', Validators.required],
                ['testFilter2', Validators.required]
            ]),
            'new-sorting': [''],
            'sortings': formBuilder.array([
                ['testSorting1', Validators.required],
                ['testSorting2', Validators.required]
            ]),
            'uri': [''],
            'type': ['API', Validators.required],
            'interval': ['5 min'],
            'theme': ['Light Blue']
        });

        this.chartConfigForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.themeCircleEl.nativeElement.style.color = this.chartConfigForm.controls['theme'].value.replace(/\s+/g, '').toLowerCase();
        this.downloadBtnEl.nativeElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.apiTemplate);
        this.downloadBtnEl.nativeElement.download = 'apiSourceTemplate.txt';
    }

    updateThemeCircleColor(color: string) {
        this.themeCircleEl.nativeElement.style.color= color.replace(/\s+/g, '').toLowerCase();
    }

    updateDownloadLink(fileType: string) {
        if (fileType === 'API') {
            this.downloadBtnEl.nativeElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.apiTemplate);
            this.downloadBtnEl.nativeElement.download = 'apiSourceTemplate.txt';
        } else if (fileType === 'JSON') {
            this.downloadBtnEl.nativeElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.jsonTemplate));
            this.downloadBtnEl.nativeElement.download = 'jsonSourceTemplate.json';
        } else if (fileType === 'CSV') {
            this.downloadBtnEl.nativeElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.csvTemplate);
            this.downloadBtnEl.nativeElement.download = 'csvSourceTemplate.csv';
        }
    }

    onAddFilter() {
        (<FormArray>this.chartConfigForm.controls['filters']).push(new FormControl(this.chartConfigForm.controls['new-filter'].value, Validators.required));
        this.chartConfigForm.controls['new-filter'].setValue('');
    }

    onAddSorting() {
        (<FormArray>this.chartConfigForm.controls['sortings']).push(new FormControl(this.chartConfigForm.controls['new-sorting'].value, Validators.required));
        this.chartConfigForm.controls['new-sorting'].setValue('');
    }

    onChangeDropdownMenu(menuName: string, selectValue: string) {
        this.chartConfigForm.controls[menuName].setValue(selectValue);
        if (menuName === 'theme') this.updateThemeCircleColor(selectValue);
        if (menuName === 'type') this.updateDownloadLink(selectValue);
    }

    onRemoveConstraint(name:string, index: number) {
        (<FormArray>this.chartConfigForm.controls[name]).removeAt(index);
    }

    onSubmit() {
        this.closeEvent.emit({value: 'close-chart-config'});
    }

}
