import {
    Component, OnInit, OnDestroy, OnChanges, AfterViewInit, ElementRef, ViewChild, Input,
    Output, EventEmitter, SimpleChanges
} from '@angular/core';

declare let jQuery, echarts, _;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

    @ViewChild('map') mapEl: ElementRef;
    @Input() mapTitle = 'Map Title';
    @Input() options;
    @Output() regionClickEvent: EventEmitter<any> = new EventEmitter();
    @Output() pointClickEvent: EventEmitter<any> = new EventEmitter();

    currentRegion: string = 'china';
    mapObject: any;

    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.mapObject.dispose();
    }

    ngOnChanges(change: SimpleChanges) {
        if (this.options && this.mapObject) {
            let options = jQuery.extend(true, {}, this.getOptions(), this.options);
            this.mapObject.setOption(options);
        }
    }

    ngAfterViewInit() {
        this.mapObject = echarts.init(this.mapEl.nativeElement);
        this.mapObject.on('click', (obj) => {
            if (obj && obj.componentType && obj.name) {
                if (obj.componentType === 'geo') {
                    this.regionClickEvent.next(obj.name);
                } else if (obj.componentType === 'series') {
                    this.pointClickEvent.next(obj.name);
                }
            }
        });
        window.addEventListener('resize',  _.throttle(this.mapObject.resize, 100));
    }

    getOptions() {
        let options = {
            backgroundColor: 'transparent',
            geo: {
                map: this.currentRegion,
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
            }
        };
        return options;
    }
}
