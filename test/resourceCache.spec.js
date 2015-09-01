/* global angular, describe, beforeEach, module, it, jasmine, inject, expect */

(function() {
    'use strict';

    describe('the resourceCacheModule', function() {

        beforeEach(module('resourceCacheModule'));
        beforeEach(module(function($provide) {
            $provide.service('$window', function() { });
        }));

        describe('the resourceCacheSession', function() {
            var service, $window;

            beforeEach(inject(['resourceCacheSession', '$window', function(cacheSession, _$window_) {
                service = cacheSession;
                $window = _$window_;
                $window.sessionStorage = {};
            }]));

            describe('exposes a get method', function() {
                it('that is defined', function() {
                    expect(service.get).toBeDefined();
                });

                it('that return a promise with the item', function() {
                    $window.sessionStorage.key = angular.toJson({
                        val: 'value'
                    });
                    service.get('key').$promise.then(function(item) {
                        expect(item.val).toBe('value');
                        expect(item.$origin).toBe('sessionStorage');
                    });
                });

                it('that fails a promise if the item does not exist', function() {
                    service.get('key').$promise.catch(function() {
                        expect(true).toBeTruthy();
                    });
                });

                it('that calls the fallback function', function(){
                    var fn = jasmine.createSpy('fn').and.returnValue({ value: 'value'});
                    expect(service.get('key', fn).value).toBe('value');
                    expect(fn).toHaveBeenCalled();
                    expect($window.sessionStorage.key).toBeDefined();
                });
            });

            describe('exposes a set method', function() {
                it('that is defined', function() {
                    expect(service.set).toBeDefined();
                });

                it('that set the item in the sessionStorage', function() {
                    service.set('key', {});
                    expect($window.sessionStorage.key).toBeDefined();
                });

            });

            describe('exposes a has method', function() {
                it('that is defined', function() {
                    expect(service.has).toBeDefined();
                });

                it('that verify if the storage has the item', function() {
                    expect(service.has('key')).toBeFalsy();
                    $window.sessionStorage.key = {};
                    expect(service.has('key')).toBeTruthy();
                });

            });

            describe('exposes a remove method', function() {
                it('that is defined', function() {
                    expect(service.remove).toBeDefined();
                });

                it('that remove the item from the store', function() {
                    $window.sessionStorage.removeItem = jasmine.createSpy('remove');
                    service.remove('key');
                    expect($window.sessionStorage.removeItem).toHaveBeenCalledWith('key');
                });
            });

            describe('exposes a clear method', function() {
                it('that is defined', function() {
                    expect(service.clear).toBeDefined();
                });

                it('that clear the store', function() {
                    $window.sessionStorage.clear = jasmine.createSpy('clear');
                    service.clear();
                    expect($window.sessionStorage.clear).toHaveBeenCalled();
                });
            });
        });

        describe('the resourceCacheLocal', function() {
            var service, $window;

            beforeEach(inject(['resourceCacheLocal', '$window',function(cacheLocal, _$window_) {
                service = cacheLocal;
                $window = _$window_;
                $window.localStorage = {};
            }]));

            describe('exposes a get method', function() {
                it('that is defined', function() {
                    expect(service.get).toBeDefined();
                });

                it('that return a promise with the item', function() {
                    $window.localStorage.key = angular.toJson({
                        val: 'value'
                    });
                    service.get('key').$promise.then(function(item) {
                        expect(item.val).toBe('value');
                        expect(item.$origin).toBe('localStorage');
                    });
                });

                it('that fails a promise if the item does not exist', function() {
                    service.get('key').$promise.catch(function() {
                        expect(true).toBeTruthy();
                    });
                });

                it('that calls the fallback function', function(){
                    var fn = jasmine.createSpy('fn').and.returnValue({ value: 'value'});
                    expect(service.get('key', fn).value).toBe('value');
                    expect(fn).toHaveBeenCalled();
                    expect($window.localStorage.key).toBeDefined();
                });
            });

            describe('exposes a set method', function() {
                it('that is defined', function() {
                    expect(service.set).toBeDefined();
                });

                it('that set the item in the localStorage', function() {
                    service.set('key', {});
                    expect($window.localStorage.key).toBeDefined();
                });

            });

            describe('exposes a has method', function() {
                it('that is defined', function() {
                    expect(service.has).toBeDefined();
                });

                it('that verify if the storage has the item', function() {
                    $window.localStorage.key = {};
                    expect(service.has('key')).toBeTruthy();
                });

            });

            describe('exposes a remove method', function() {
                it('that is defined', function() {
                    expect(service.remove).toBeDefined();
                });

                it('that remove the item from the store', function() {
                    $window.localStorage.removeItem = jasmine.createSpy('remove');
                    service.remove('key');
                    expect($window.localStorage.removeItem).toHaveBeenCalledWith('key');
                });
            });

            describe('exposes a clear method', function() {
                it('that is defined', function() {
                    expect(service.clear).toBeDefined();
                });

                it('that clear the store', function() {
                    $window.localStorage.clear = jasmine.createSpy('clear');
                    service.clear();
                    expect($window.localStorage.clear).toHaveBeenCalled();
                });
            });
        });

        describe('the resourceCacheAngular', function() {
            var service, cache;

            beforeEach(inject(['resourceCacheAngular', '$cacheFactory', function(cacheService, $cacheFactory) {
                service = cacheService;
                cache = $cacheFactory.get('general');
                cache.removeAll();
            }]));

            describe('exposes a get method', function() {
                it('that is defined', function() {
                    expect(service.get).toBeDefined();
                });

                it('that return a promise with the item', function() {
                    service.set('key', { val: 'value' });
                    service.get('key').$promise.then(function(item) {
                        expect(item.val).toBe('value');
                        expect(item.$origin).toBe('localStorage');
                    });
                });

                it('that fails a promise if the item does not exist', function() {
                    service.get('key').$promise.catch(function() {
                        expect(true).toBeTruthy();
                    });
                });

                it('that calls the fallback function', function(){
                    var fn = jasmine.createSpy('fn').and.returnValue({ value: 'value'});
                    expect(service.get('key', fn).value).toBe('value');
                    expect(fn).toHaveBeenCalled();
                    expect(service.has('key')).toBeTruthy();
                });
            });

            describe('exposes a set method', function() {
                it('that is defined', function() {
                    expect(service.set).toBeDefined();
                });

                it('that set the item in the localStorage', function() {
                    service.set('key', {});
                    expect(cache.get('key')).toBeDefined();
                });

            });

            describe('exposes a has method', function() {
                it('that is defined', function() {
                    expect(service.has).toBeDefined();
                });

                it('that verify if the storage has the item', function() {
                    cache.put('key', {});
                    expect(service.has('key')).toBeTruthy();
                });

            });

            describe('exposes a remove method', function() {
                it('that is defined', function() {
                    expect(service.remove).toBeDefined();
                });

                it('that remove the item from the store', function() {
                    cache.remove = jasmine.createSpy('remove');
                    service.remove('key');
                    expect(cache.remove).toHaveBeenCalledWith('key');
                });
            });

            describe('exposes a clear method', function() {
                it('that is defined', function() {
                    expect(service.clear).toBeDefined();
                });

                it('that clear the store', function() {
                    cache.removeAll = jasmine.createSpy('removeAll');
                    service.clear();
                    expect(cache.removeAll).toHaveBeenCalled();
                });
            });
        });


        describe('the resourceCacheFactory', function() {
            var factoryProvider, factory;
            

            describe('', function() {
                beforeEach(module(['resourceCacheFactoryProvider', function(resourceCacheFactoryProvider) {
                    factoryProvider = resourceCacheFactoryProvider;
                }]));
                beforeEach(inject(function() {
                    
                }));
                describe('define a resourceCacheSystem method that', function() {

                    it('should be defined', function() {
                        expect(factoryProvider.resourceCacheSystem).toBeDefined();
                    });
                    it('should accept a valid option', function() {
                        factoryProvider.resourceCacheSystem(factoryProvider.cacheSystems.session);
                        var fn = function(){ factoryProvider.resourceCacheSystem('invalid'); };

                        expect(fn).toThrow();
                    });
                    
                });


                it('should return the default resourceCacheAngular instance', inject(['resourceCacheFactory', 'resourceCacheAngular', function(factory, cacheAngular) {
                    expect(factoryProvider.resourceCacheSystem()).toBeUndefined();
                    expect(factory).toBe(cacheAngular);
                    expect(factory.$type).toBe('resourceCacheAngular');
                }]));
            });

            describe('when configurated', function() {
                beforeEach(module(['resourceCacheFactoryProvider', function(resourceCacheFactoryProvider) {
                    factoryProvider = resourceCacheFactoryProvider;
                    factoryProvider.resourceCacheSystem(factoryProvider.cacheSystems.session);
                }]));
                
                it('should return the defined provider', inject(['resourceCacheFactory', 'resourceCacheSession', function(factory, cacheSession) {
                    expect(factory).toBe(cacheSession);
                    expect(factory.$type).toBe('resourceCacheSession');
                }]));
            });
        });
    });
})();
