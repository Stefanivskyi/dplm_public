import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sensor } from '../../shared/models/sensor.model';
import { CustomChartService } from '../../services/custom-chart.service';
import { CustomSensor } from '../../shared/models/custom-chart/custom-chart-sensor.model';
import { CustomChart } from '../../shared/models/custom-chart/custom-chart.model';
import { SensorConnect } from '../../shared/models/sensorConnect.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { ProjectService } from '../../services/project.service';

@Component({
    templateUrl: 'custom-chart.component.html',
    selector: 'app-custom-chart',
    styleUrls: ['./custom-chart.component.scss']
})
export class CustomChartComponent implements OnInit, OnDestroy {

    public chartName: string
    public sensorFromCustomCharts: Sensor[] = []
    public customChartSensors: Sensor[] = []
    public customChartProjects: CustomChart[] = []
    public customSensorConnectName: CustomChart
    private mySubscription;


    constructor(private customChartService: CustomChartService,
        private route: ActivatedRoute, private router: Router, private project: ProjectService) {
    }

    saveCustomChart() {
        this.customChartService.saveCustomChart(this.chartName, this.sensorFromCustomCharts).subscribe(data => {
            console.log(data)
        },
        reload => {
        window.location.reload()
        })
    }

    getCustomChart() {
        this.route.params.subscribe(params => {
        this.customChartService.getCustomChart(params.id).subscribe(customCharts => {
            customCharts.forEach(customChart => {
                this.customChartProjects.push(customChart)
                customChart.sensors.forEach(customSensor => {
                    this.customChartSensors.push(new Sensor(customSensor.sensorChipId, customSensor.sensorId));
                })
            })
        })
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false
    }
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false
            }
        })
    }

    deleteCustomChart(chartName) {
        this.customChartService.deleteCustomChart(chartName).subscribe(data => {
            console.log(data)
        window.location.reload()
        },
        error => {
            console.log('error')
        })
    }

    sensorClickEvent(selectedSensors: Sensor) {
        if (this.sensorFromCustomCharts.includes(selectedSensors)) {
            console.log('Error')
        } else {
        this.sensorFromCustomCharts.push(selectedSensors)
        }

  }
  ngOnInit() {
      this.getCustomChart()
  }

  ngOnDestroy() {
    if (this.mySubscription) {
        this.mySubscription.unsubscribe()
    }
  }
}
