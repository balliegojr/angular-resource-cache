/* global angular */

(function(){
    'use strict';

    angular.module('bCacheModule', [])
        .service('bCacheSession', ['$q', '$window', function($q, $window){
            this.get = function(key, fallback){
                var def = $q.defer();
                var data;
                if (undefined !== $window.sessionStorage[key] && null !== $window.sessionStorage[key]){
                    data = angular.fromJson($window.sessionStorage[key]);
                    data.$origin = 'sessionStorage';
                } else if (fallback !== undefined){
                    data = this.set(key, fallback());
                }

                if (data){
                    data.$promise = def.promise;
                    data.$resolved = true;

                    def.resolve(data);
                    return data;
                }

                def.reject();
                return {$resolved: true, $promise: def.promise };
            };
            this.set = function(key, item){
                try { $window.sessionStorage[key] = angular.toJson(item); }
                catch (e) {}

                return item;
            };
            this.has = function(key){
                return undefined !== $window.sessionStorage[key];
            };
            this.remove = function(key){
                return $window.sessionStorage.removeItem(key);
            };
            this.clear = function(){
                $window.sessionStorage.clear();
            };
        }])
        .service('bCacheLocal', ['$q','$window', function($q,$window){
            this.get = function(key, fallback){
                var def = $q.defer();

                var data;
                if (undefined !== $window.localStorage[key] && null !== $window.localStorage[key]){
                    data = angular.fromJson($window.localStorage[key]);
                    data.$origin = 'localStorage';
                } else if (fallback !== undefined){
                    data = this.set(key, fallback());
                }

                if (data){
                    data.$promise = def.promise;
                    data.$resolved = true;

                    def.resolve(data);
                    return data;
                }

                def.reject();
                return {$resolved: true, $promise: def.promise };
            };
            this.set = function(key, item){
                try {$window.localStorage[key] = angular.toJson(item);}
                catch (e) {}
                return item;
            };
            this.has = function(key){
                return undefined !== $window.localStorage[key];
            };
            this.remove = function(key){
                return $window.localStorage.removeItem(key);
            };
            this.clear = function(){
                $window.localStorage.clear();
            };
        }])
        .service('bCacheAngular', ['$q', '$cacheFactory', function($q, $cacheFactory){
            
            var cache = $cacheFactory('general');
            // eventDispatcher.subscribe('Auth.LoggedIn', function(){
            //     cache.removeAll();
            // });

            this.get = function(key, fallback){
                var def = $q.defer();

                var item = cache.get(key);
                var data;
                if (undefined !== item && null !== item){
                    if (item.$promise !== undefined){
                        return item;
                    }
                    data = angular.copy(item);
                    data.$origin = 'cache';

                } else if (fallback !== undefined){
                    data = this.set(key, fallback());
                }

                if (data){
                    data.$promise = def.promise;
                    data.$resolved = true;

                    def.resolve(data);

                    return data;
                }
                

                def.reject();
                return {$resolved: true, $promise: def.promise };
            };
            this.set = function(key, item){
                try { cache.put(key, item);}
                catch (e) {}
                return item;
            };
            this.has = function(key){
                return undefined !== cache.get(key);
            };
            this.remove = function(key){
                return cache.remove(key);
            };
            this.clear = function(){
                cache.removeAll();
            };

        }])
        .provider('bCacheFactory', [function(){
            this.cacheSystems = {
                session: 'bCacheSession',
                local: 'bCacheLocal',
                angular: 'bCacheAngular'
            };
            var defaultCache;
            this.bCacheSystem = function(cache){
                if (cache === undefined){
                    return defaultCache;
                } 

                for (var system in this.cacheSystems){
                    if (this.cacheSystems[system] === cache){
                        defaultCache = cache;
                        return;
                    }
                }

                throw 'option not accepted';

            };

            this.$get = ['$injector', function($injector){
                var system = $injector.get(defaultCache || this.cacheSystems.angular);
                system.$type = defaultCache || this.cacheSystems.angular;
                return system;
            }];

        }]);
})();