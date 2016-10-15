import {Component, OnInit} from '@angular/core';
import {MapService} from './shared/services/map.service';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app works!';
    testChartData: any;
    testMapOptions: any = {};

    constructor(private _mapService: MapService, private translate: TranslateService) {
        this.initTranslate();
    }

    initTranslate() {
        this.translate.addLangs(['en', 'cn']);
        this.translate.setDefaultLang('en');
        let browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|cn/) ? browserLang : 'en');
    }

    ngOnInit() {
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

            let data = [
                { name: '海门', value: 556 },
                { name: '廊坊', value: 193 },
                { name: '菏泽', value: 194 },
                { name: '合肥', value: 50 },
                { name: '武汉', value: 273 },
                { name: '大庆', value: 279 }
            ];

            let data2 = [
                { name: '海门', value: 90 },
                { name: '鄂尔多斯', value: 20 },
                { name: '招远', value: 40 },
                { name: '舟山', value: 30 },
                { name: '齐齐哈尔', value: 40 },
                { name: '盐城', value: 40 },
                { name: '赤峰', value: 60 },
                { name: '青岛', value: 80 }
            ];

            let customizedOptions = {
                geo: {
                    zoom: 1.3
                },
                series: [
                    {
                        name: 'pm2.5',
                        type: 'effectScatter',
                        data: this._mapService.convertDataByCityName(data)
                    },
                    {
                        name: 'pm110',
                        type: 'scatter',
                        data: this._mapService.convertDataByCityName(data2)
                    }
                ]
            };

            this.testMapOptions = this._mapService.generateOptions(customizedOptions);
        }, 0);
    }
}
