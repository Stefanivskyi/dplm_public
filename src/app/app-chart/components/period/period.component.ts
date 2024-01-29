import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { PeriodHoursEnum } from '../../../../shared/enums/period.hours.enum';
import { SensorConnect } from '../../../../shared/models/sensorConnect.model';
import { ChannelModel } from './channel.model';

@Component({
    selector: 'app-period',
    templateUrl: 'period.component.html',
    styleUrls: ['./period.component.scss']
  })
  export class PeriodComponent implements OnInit {

    activeIndex = 1;

    public isRealtimeActive = false;
    public _sensorConnect: SensorConnect;
    public _selectedChannel = 0;

    public channels: ChannelModel[];

    @Output() channelChangedEvent = new EventEmitter<ChannelModel>();

    set selectedChannel(channel) {
        const selectedChannel = this.channels.find(ch => ch.index === channel);
        if (selectedChannel !== undefined) {
            this.channelChangedEvent.emit(selectedChannel);
        }
    }
    get selectedChannel() {
        return this._selectedChannel;
    }

    @Input() set sensorConnect(sensorConnect: SensorConnect) {
        this._sensorConnect = sensorConnect;

        this.channels = [];
        if (sensorConnect) {
            const channelsNumber = this._sensorConnect.getChannelsQuantity();
            for (let i = 0; i < channelsNumber; i++) {
                this.channels.push(new ChannelModel(i));
            }
        } else {
            this.channels.push(new ChannelModel(0));
        }
    }

    @Output() periodChangedEvent = new EventEmitter<{start: Date, end: Date}>();
    @Output() realtimeStateChangedEvent = new EventEmitter<{active: boolean}>();

    selectChannel(id: any): void {
        this.selectedChannel = +id;
        this.cancelRealtimeIfNeeded();
    }

    cancelRealtimeIfNeeded() {
        if (this.isRealtimeActive) {
            this.realtimeClicked();
        }
    }

    realtimeClicked() {
        this.isRealtimeActive = !this.isRealtimeActive;
        const active: boolean = this.isRealtimeActive;
        this.realtimeStateChangedEvent.emit({active});
    }

    getUTCNowDate(): Date {
        const now = new Date();
        return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    }

    min5Period() {
        const start: Date = this.getUTCNowDate();
        const end: Date = this.getUTCNowDate();
        start.setMinutes(start.getMinutes() - 5);

        this.periodChangedEvent.emit({start, end});
    }

    hourPeriod() {
        const start: Date = this.getUTCNowDate();
        const end: Date = this.getUTCNowDate();
        start.setHours(start.getHours() - 1);

        this.periodChangedEvent.emit({start, end});
    }

    dayPeriod() {
        const start: Date = this.getUTCNowDate();
        const end: Date = this.getUTCNowDate();
        start.setDate(start.getDate() - 1);

        this.periodChangedEvent.emit({start, end});
    }

    weekPeriod() {
        const start: Date = this.getUTCNowDate();
        const end: Date = this.getUTCNowDate();
        start.setDate(start.getDate() - 7);

        this.periodChangedEvent.emit({start, end});
    }

    monthPeriod() {
        const start: Date = this.getUTCNowDate();
        const end: Date = this.getUTCNowDate();
        start.setMonth(start.getMonth() - 1);

        this.periodChangedEvent.emit({start, end});
    }

    ngOnInit(): void {
        this.hourPeriod();
        this.selectedChannel = 0;
    }
  }
