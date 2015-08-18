﻿
module SmashLeague {
  'use strict';

  export interface IAuthenticationService {
    IsAuthenticated: boolean;
    Username: string;
    UnauthorizedResponseCallback(): void;
    ValidateAuthState(): void;
  }

  export class AuthenticationService implements IAuthenticationService {

    private _isAuthenticated: boolean;
    private _username: string;
    private _http: ng.IHttpService;
    private _root: ng.IRootScopeService;
    private _profileService: Profile.ProfileService;

    public get IsAuthenticated() { return this._isAuthenticated; }
    public set IsAuthenticated(value: boolean) {
      if (value) {
        this._profileService.LoadProfile();
      }
      else {
        this._profileService.DestroyProfile();
      }

      this._isAuthenticated = value;
    }
    public get Username() { return this._username; }

    public static $inject = [
      '$http',
      '$rootScope',
      'ProfileService'
    ];

    constructor(
      http,
      rootScope,
      profileService) {

      this._http = http;
      this._profileService = profileService;
      this._root = rootScope;
      this.ValidateAuthState();
    }

    public UnauthorizedResponseCallback() {

      this.ValidateAuthState();
    }

    public ValidateAuthState(
      ) {

      this._http.get('/auth/authenticate')
        .success((data: any) => this.SetAuthState(true, data))
        .error(() => this.SetAuthState(false));
    }

    private SetAuthState(
      success: boolean,
      data: any = undefined) {

      if (success) {
        this.IsAuthenticated = data.Authenticated;
        this._username = data.Username;
      }
      else {
        this.IsAuthenticated = false;
        this._username = undefined;
      }

      this._root.$broadcast('SmashLeague:Event:AuthStateChange', this.IsAuthenticated, this.Username);
    }
  }
}