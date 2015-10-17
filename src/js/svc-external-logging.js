"use strict";

angular.module("risevision.common.logging", [])
  .constant("EXTERNAL_LOGGER_SERVICE_URL",
    "https://www.googleapis.com/bigquery/v2/projects/client-side-events/datasets/Apps_Events/tables/TABLE_ID/insertAll"
)
  .constant("EXTERNAL_LOGGER_REFRESH_URL",
    "https://www.googleapis.com/oauth2/v3/token?" +
    "client_id=1088527147109-6q1o2vtihn34292pjt4ckhmhck0rk0o7.apps.googleusercontent.com&" +
    "client_secret=nlZyrcPLg6oEwO9f9Wfn29Wh&refresh_token=1/xzt4kwzE1H7W9VnKB8cAaCx6zb4Es4nKEoqaYHdTD15IgOrJDtdun6zK6XiATCKT&" +
    "grant_type=refresh_token"
)
  .constant("EXTERNAL_LOGGER_INSERT_SCHEMA", {
    "kind": "bigquery#tableDataInsertAllRequest",
    "skipInvalidRows": false,
    "ignoreUnknownValues": false,
    "rows": [{
      "insertId": "",
      "json": {
        "event": "",
        "event_details": "",
        "event_value": 0,
        "host": "",
        "ts": 0
      }
    }]
  })
  .factory("externalLogging", ["$http", "$window", "$q", "$log",
    "EXTERNAL_LOGGER_REFRESH_URL", "EXTERNAL_LOGGER_INSERT_SCHEMA",
    "EXTERNAL_LOGGER_SERVICE_URL",
    function ($http, $window, $q, $log, EXTERNAL_LOGGER_REFRESH_URL,
      EXTERNAL_LOGGER_INSERT_SCHEMA, EXTERNAL_LOGGER_SERVICE_URL) {
      var factory = {};

      var _token, _tokenRefreshedAt;

      factory.logEvent = function (eventName, eventDetails, eventValue) {
        $log.debug("BQ log", eventName, eventDetails, eventValue);

        var deferred = $q.defer();

        factory.getToken().then(function (token) {
          var date = new Date(),
            year = date.getUTCFullYear(),
            month = date.getUTCMonth() + 1,
            day = date.getUTCDate(),
            insertData = JSON.parse(JSON.stringify(
              EXTERNAL_LOGGER_INSERT_SCHEMA)),
            serviceUrl;

          if (month < 10) {
            month = "0" + month;
          }
          if (day < 10) {
            day = "0" + day;
          }

          serviceUrl = EXTERNAL_LOGGER_SERVICE_URL.replace("TABLE_ID",
            "events" + year + month + day);

          insertData.rows[0].insertId = Math.random().toString(36).substr(2)
            .toUpperCase();
          insertData.rows[0].json.event = eventName;
          if (eventDetails) {
            insertData.rows[0].json.event_details = eventDetails;
          }
          if (eventValue) {
            insertData.rows[0].json.event_value = eventValue;
          }
          insertData.rows[0].json.host = $window.location.hostname;
          insertData.rows[0].json.ts = new Date().toISOString();

          $http.post(serviceUrl, insertData, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            }
          }).then(function (result) {
            deferred.resolve(result);
          }, function (error) {
            $log.debug("error posting to BQ", error);
            deferred.reject(error);
          });
        }, function (error) {
          $log.debug("BQ token ERROR", error);
          deferred.reject(error);
        });

        return deferred.promise;
      };

      factory.getToken = function () {
        var deferred = $q.defer();
        if (_token && new Date().getTime() - _tokenRefreshedAt < 3580000) {
          deferred.resolve(_token);
        } else {
          $http.post(EXTERNAL_LOGGER_REFRESH_URL).then(function (resp) {
            _token = resp.data.access_token;
            _tokenRefreshedAt = new Date().getTime();
            deferred.resolve(resp.data.access_token);
          }, function () {
            deferred.reject();
          });
        }
        return deferred.promise;
      };

      return factory;
    }
  ]);
