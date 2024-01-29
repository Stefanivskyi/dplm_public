import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';

import { Project } from '../shared/models/project.model';
import { TreeProject } from '../shared/models/devices-tree/treeProject.model';
import { HttpClientService } from '../asyncServices/http-client.service'
import { UserStore } from '../store/user.store';

@Injectable()
export class ProjectService {

    private cachedProjectsObservable: Observable<any> = null;

    constructor(private http: HttpClientService) { }

    public getProjects(): Observable<Project[]> {

        if (this.cachedProjectsObservable) {
            return this.cachedProjectsObservable;
        } else {
            console.log('projectService:: loading projects from the server')

            const header = new Map<string, string>();
            header.set('authorization', 'Bearer ' + localStorage.access_token);

            this.cachedProjectsObservable = this.http.get<Project[]>('/user/projects', null, header)
                .map((response) => {
                    console.log('getProjects() data read complete: ' + response)
                    return response.map(item => { return new Project().deserialize(item) })
                })
                .publishReplay(1)
                .refCount();
            return this.cachedProjectsObservable;
        }
    };

    getTreeChildren(): Observable<TreeProject[]> {

        return this.getProjects()
            .map(response => response.map(item => {
                return new TreeProject().deserialize(item);
            })
            )
    };
}
