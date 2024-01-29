import { Component, OnInit } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';


@Component({
    selector: 'app-dashboard-map',
    templateUrl: './app-dashboard-map.component.html',
    styleUrls: ['./app-dashboard-map.component.scss']
})
export class AppDashboardMapComponent implements OnInit {
    private map: AmChart;

    targetSVG = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 ' +
        'c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 ' +
        'M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';

    constructor(private AmCharts: AmChartsService) { }
    ngOnInit() {
        this.map = this.AmCharts.makeChart('mapdiv', this.getChartDefaultOptions());
    }

    getChartDefaultOptions() {
        return {
            type: 'map',
            projection: 'winkel3',
            theme: 'light',
            imagesSettings: {
                rollOverColor: '#004466',
                rollOverScale: 3,
                selectedScale: 3,
                selectedColor: '#004466',
                color: '#006699'
            },

            areasSettings: {
                // unlistedAreasColor: '#15A892',
                unlistedAreasColor: '#0088cc',
                outlineThickness: 0.1
            },

            dataProvider: {
                map: 'worldLow',
                images: [{
                    svgPath: this.targetSVG,
                    zoomLevel: 5,
                    scale: 0.5,
                    title: 'Country Park III',
                    latitude: 55.880815,
                    longitude: 37.433540
                },
                {
                    svgPath: this.targetSVG,
                    zoomLevel: 5,
                    scale: 0.5,
                    title: '88North',
                    latitude: 48.177659,
                    longitude: 11.537801
                },
                {
                    svgPath: this.targetSVG,
                    zoomLevel: 5,
                    scale: 0.5,
                    title: 'Demo Stand',
                    latitude: 48.177659,
                    longitude: 11.837801
                }]
            },
            export: {
                enabled: true
            }
        }

    }
}
