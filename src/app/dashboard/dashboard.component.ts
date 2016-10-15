import { Component, OnInit } from '@angular/core';

declare let $, _;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public gridSettings = [];

    public testChartData: any;

    ngOnInit() {
        this.gridSettings = JSON.parse(localStorage.getItem('gridSettings') || '[]');
    }

    ngAfterViewInit() {

        let vm = this;

        var options = {
            float: true,
            width: 6,
            height: 8,
            cellHeight: 102
        };
        $('#dashboard-grid-stack').gridstack(options);

        setTimeout(() => {
            this.testChartData = {
                categories: ['周一', '周二', '周三', '周四', '周五', '周六', '日'],
                series: [
                    {
                        name: '直接访问',
                        values: [320, 332, 301, 334, 390, 330, 100]
                    }
                ]
            };
        }, 0);

        let grid = $('.grid-stack').data('gridstack');
        grid.disable();
    }

}
