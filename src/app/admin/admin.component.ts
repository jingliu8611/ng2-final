import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

declare let $, _, GridStackUI;

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    public editingWidget: any = {
        id: null,
        apiUrl: null,
        type: null
    };

    public isInEditMode: boolean = false;
    // public apiUrl: any;

    // public gridRowCount = 8

    public widgets = [];

    public gridSettings = [];

    public gridRowsCount: number = 8;
    public gridColumnsCount: number = 12;

    public gridRows = [1, 2, 3, 4, 5, 6, 7, 8];
    public gridColumns = [1, 2, 3, 4, 5, 6];

    public dashboardName: string = 'default dashboard name';
    public dashboardEditName: string;

    constructor(private translate: TranslateService) {}

    ngOnInit() {
        this.gridSettings = JSON.parse(localStorage.getItem('gridSettings') || '[]');

        setTimeout(() => {
            this.widgets = _.chunk([
                {
                    id: 1,
                    type: 'barChart',
                    imageUrl: 'url("/assets/images/bar-chart.png")'
                },
                {
                    id: 2,
                    type: 'lineChart',
                    imageUrl: 'url("/assets/images/line-chart.png")'
                },
                {
                    id: 4,
                    type: 'areaChart',
                    imageUrl: 'url("/assets/images/area-chart.png")'
                },
                {
                    id: 5,
                    type: 'pieChart',
                    imageUrl: 'url("/assets/images/pie-chart.png")'
                },
                {
                    id: 6,
                    type: 'map',
                    imageUrl: 'url("/assets/images/map.png")'
                }
            ], 2);
        }, 0);
    }

    ngAfterViewInit() {
        let vm = this;

        var options = {
            float: true,
            width: 6,
            height: 8,
            animate: true,
            cellHeight: 95,
        };
        $('.grid-stack').gridstack(options);

        let grid = $('.grid-stack').data('gridstack');

        $('.grid-stack').on('change', function(event, items) {
            _.map(items, function(n) {
                let node = _.find(vm.gridSettings, {id: _.parseInt(n.id)})
                node.x = n.x;
                node.y = n.y;
                node.width = n.width;
                node.height = n.height;
            });
        });
    }

    addNewWidget(widget) {
        let widgetInstanceId = this.gridSettings.length;
        let node = {
            id: widgetInstanceId,
            type: widget.type,
            imageUrl: widget.imageUrl,
            apiUrl: '',
            title: '',
            autoPosition: true,
            width: 1,
            height: 1,
            x: null,
            y: null
        };
        let grid = $('.grid-stack').data('gridstack');
        if (grid.willItFit(null, null, node.width, node.height, true)) {
            this.gridSettings.push(node);
            setTimeout(() => {
                grid.makeWidget('[data-gs-id=\'' + widgetInstanceId + '\']');
                node.autoPosition = false;
            }, 0);
        }
        else {
            alert('Not enough free space to place the widget');
        }

    }

    removeWidget(node) {
        _.remove(this.gridSettings, {
            id: node.id
        });
        let grid = $('.grid-stack').data('gridstack');
        grid.removeWidget('[data-gs-id=\'' + node.id + '\']', false);
    }

    openConfigModal(node) {
        $('#myModal').modal('show');
        this.editingWidget = _.cloneDeep(node);
    }

    closeModal() {
        // let obj = _.find(this.widgetSettings, { id: this.editingWidget.id });
        // obj.title = this.editingWidget.title;
        // obj.apiUrl = this.editingWidget.apiUrl;
        $('#myModal').modal('hide');
    }

    saveGrid() {
        localStorage.setItem('gridSettings', JSON.stringify(this.gridSettings));
    }

    enterEdit() {
        this.isInEditMode = true;
        this.dashboardEditName = this.dashboardName;
    }

    doneEdit() {
        this.isInEditMode = false;
        this.dashboardName = this.dashboardEditName;
        this.dashboardEditName = null;
    }

}
