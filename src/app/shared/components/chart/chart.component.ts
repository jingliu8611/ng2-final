import {
    Component, OnInit, ElementRef, ViewChild, Input, OnDestroy, OnChanges, AfterViewInit,
    SimpleChanges
} from '@angular/core';

declare let jQuery, echarts, _;

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    @ViewChild('chart') chartEl: ElementRef;

    @Input() chartType;
    @Input() availableTypes;
    @Input() chartTitle = 'Chart Title';
    @Input() chartData;
    @Input() options;
    @Input() update;

    chartObject: any;
    currentChartType: string;
    currentAvailableChartTypes: any;
    chartTypeClassMappings = {
        bar: 'fa-bars',
        column: 'fa-bar-chart',
        line: 'fa-line-chart',
        area: 'fa-area-chart',
        pie: 'fa-pie-chart'
    };

    constructor() { }

    ngOnDestroy() {
        this.chartObject.dispose();
    }

    ngOnInit() {
        this.currentChartType = this.chartType;
        if (this.availableTypes !== undefined) {
            this.currentAvailableChartTypes = this.availableTypes.filter(d => d !== this.currentChartType);
        } else {
            this.currentAvailableChartTypes = Object.keys(this.chartTypeClassMappings).filter(d => d !== this.currentChartType);
        }
    }

    ngOnChanges(change: SimpleChanges) {
        if (this.chartData && this.chartObject) {
            let options = jQuery.extend(true, {}, this.getOptions(), this.options);
            this.chartObject.setOption(options, true);
        }
    }

    ngAfterViewInit() {
        this.chartObject = echarts.init(this.chartEl.nativeElement);
        window.addEventListener('resize',  _.throttle(this.chartObject.resize, 100));
    }

    getOptions() {
        let options, names, series;
        switch (this.currentChartType) {
            case 'column':
                names = this.chartData.series.map(d => d.name);
                series = [];
                for (let i = 0; i < this.chartData.series.length; i++) {
                    let serie: any = {};
                    serie.type = 'bar';
                    serie.name = this.chartData.series[i].name;
                    serie.data = this.chartData.series[i].values;
                    series.push(serie);
                }
                options = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: names,
                        left: 'left'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.chartData.categories
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: series
                };
                break;
            case 'bar':
                names = this.chartData.series.map(d => d.name);
                series = [];
                for (let i = 0; i < this.chartData.series.length; i++) {
                    let serie: any = {};
                    serie.type = 'bar';
                    serie.name = this.chartData.series[i].name;
                    serie.data = this.chartData.series[i].values;
                    series.push(serie);
                }
                options = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: names,
                        left: 'left'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: this.chartData.categories
                        }
                    ],
                    series: series
                };
                break;
            case 'line':
                names = this.chartData.series.map(d => d.name);
                series = [];
                for (let i = 0; i < this.chartData.series.length; i++) {
                    let serie: any = {};
                    serie.type = 'line';
                    serie.name = this.chartData.series[i].name;
                    serie.data = this.chartData.series[i].values;
                    series.push(serie);
                }
                options = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: names,
                        left: 'left'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.chartData.categories
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: series
                };
                break;
            case 'area':
                names = this.chartData.series.map(d => d.name);
                series = [];
                for (let i = 0; i < this.chartData.series.length; i++) {
                    let serie: any = {};
                    serie.type = 'line';
                    serie.name = this.chartData.series[i].name;
                    serie.data = this.chartData.series[i].values;
                    serie.areaStyle = { normal: {} };
                    series.push(serie);
                }
                options = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: names,
                        left: 'left'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.chartData.categories
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: series
                };
                break;
            case 'pie':
                names = this.chartData.series.map(d => d.name);
                series = [];
                for (let i = 0; i < this.chartData.series.length; i++) {
                    let serie: any = {};
                    serie.type = 'pie';
                    serie.name = this.chartData.series[i].name;
                    serie.roseType = 'angle';
                    serie.data = [];
                    for (let j = 0; j < this.chartData.series[i].values.length; j++) {
                        serie.data.push({
                            name: this.chartData.categories[j],
                            value: this.chartData.series[i].values[j]
                        });
                    }
                    series.push(serie);
                }
                options = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        data: this.chartData.categories,
                        left: 'left'
                    },
                    calculable : true,

                    series: series
                };
                break;
            default:
                options = {};
        }
        return options;
    }

    changeChartType(type) {
        this.currentChartType = type;
        if (this.availableTypes !== undefined) {
            this.currentAvailableChartTypes = this.availableTypes.filter(d => d !== this.currentChartType);
        } else {
            this.currentAvailableChartTypes = Object.keys(this.chartTypeClassMappings).filter(d => d !== this.currentChartType);
        }
        if (this.chartData) {
            let options = jQuery.extend(true, {}, this.getOptions(), this.options);
            this.chartObject.setOption(options, true);
        }
    }
}
