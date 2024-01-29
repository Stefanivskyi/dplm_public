import { NgModule } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [HttpClientModule],
    declarations: [],
    providers: [HttpClientService]
})
export class HttpModule {

}

