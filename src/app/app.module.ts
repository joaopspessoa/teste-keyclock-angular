import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';

function iniciarKeycloack(keycloak: KeycloakService) {
  return () => {
    keycloak.init({
      config: {
        url: 'https://login.recife.pe.gov.br/auth',
        realm: 'recife',
        clientId: 'qualificaAB',
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: 'https://apiqualificaap.recife.pe.gov.br/', 
        checkLoginIframe: false,
        onLoad: 'login-required',
        flow: "standard"
      }
    })
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: iniciarKeycloack,
      multi:true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
