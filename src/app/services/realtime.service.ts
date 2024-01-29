import { HubConnection, HubConnectionBuilder, LogLevel} from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClientService } from '../asyncServices/http-client.service';
import { UserStore } from '../store/user.store';
import { SubscribeSensor } from '../shared/models/realtime/subscribeSensor.model';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

interface Dictionary<T> {
  [Key: string]: T;
}

interface IMetricCallback {
  ( sensorChipId: string, sensorNumber: number, channelNumber: number, dateTime: string, s: number );
}

@Injectable()
export class RealtimeService {
  private static _hubConnection: HubConnection;
  public static subscriptions: { [id: string]: IMetricCallback } = {};

  constructor(private user: UserStore, private http: HttpClientService) {
  }

  initConnection(): Promise<any> {

    if (!RealtimeService._hubConnection) {

      const metricUrl = `${environment.ROOTURL}/metricshub/`;
      RealtimeService._hubConnection = new HubConnectionBuilder()
        .withUrl(metricUrl, { transport: 2 })
        .configureLogging(LogLevel.Information)
        .build();

      RealtimeService._hubConnection.serverTimeoutInMilliseconds = 100000;
      return this.startConnection();
    }
  }

  startConnection(): Promise<any> {

    console.log('starting signalR connection...')

    RealtimeService._hubConnection.onclose(error => {
      console.log('================================= closed connection, error: ' + error);

      this.startConnection();
    });

    RealtimeService._hubConnection.on('Metric',
      (type: string, payload: string) => this.processMetricReceived(type, payload));

    return RealtimeService._hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection established!');

        RealtimeService._hubConnection.send('StartReceive', this.user.JWT);
      })
      .catch(err => console.log('Error while establishing connection :('));
  }

  private processMetricReceived(type: string, payload: string) {
    console.log(`metric: ${type}`);
    const metric = JSON.parse(type);

    const key = metric.SensorChipID + '_' + metric.sensorNumber + '_' + metric.channel;
    const callback = RealtimeService.subscriptions[key];

    if (callback) {
      callback(metric.SensorChipID, metric.sensorNumber, metric.channel, metric.dateTime, metric.s);
    }
  }

  public async subscribe(subSensor: SubscribeSensor, metricsCallback: IMetricCallback): Promise<any> {

    if (!RealtimeService._hubConnection) {
      console.log('initializing signalR connection synchronously...')
      await this.initConnection();
      console.log('initializing signalR connection...completed')
    }

    const subscription = this.http.post<SubscribeSensor>('/realtime/subscribe', subSensor, null).toPromise();
    subscription.then(result => {
      console.log('subscribed: ' + subSensor.sensorChipId + ' / s:' + subSensor.sensorNumber + ' / ch: ' + subSensor.channelNumber);

      const key = this.getSubscribeSensorKey(subSensor);
      RealtimeService.subscriptions[key] = metricsCallback;
    })

    return subscription;
  }

  public checkSubscription(chipId: string, sensorNumber: number, channelNumber: number): Promise<any> {
    const token = this.user.JWT;
    return RealtimeService._hubConnection.invoke(
      'IsSubscribedTo', token, chipId, sensorNumber, channelNumber);
  }

  public unsubscribe(subSensor: SubscribeSensor) {

    RealtimeService._hubConnection.off('Metric', (type, payload) => this.processMetricReceived(type, payload));

    this.http.post<SubscribeSensor>('/realtime/unsubscribe', subSensor, null)
      .subscribe(result => {
        console.log('UNsubscribed: ' + subSensor.sensorChipId + ' / s:' + subSensor.sensorNumber + ' / ch: ' + subSensor.channelNumber);

        const key = this.getSubscribeSensorKey(subSensor);
        RealtimeService.subscriptions[key] = null;
      })
  }

  public getSubscribeSensorKey(subSensor: SubscribeSensor) {
    return subSensor.sensorChipId + '_' + subSensor.sensorNumber + '_' + subSensor.channelNumber;
  }
}
