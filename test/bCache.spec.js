/* global angular, describe, beforeEach, module, it, jasmine, inject, expect */

(function() {
    'use strict';

    describe('the bCacheModule', function() {

        beforeEach(module('bCacheModule'));
        beforeEach(module(function($provide) {
            $provide.service('$window', function() { });
        }));

        describe('the bCacheSession', function() {
            var service, $window;

            beforeEach(inject(['bCacheSession', '$window', function(cacheSession, _$window_) {
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

        describe('the bCacheLocal', function() {
            var service, $window;

            beforeEach(inject(['bCacheLocal', '$window',function(cacheLocal, _$window_) {
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

        describe('the bCacheAngular', function() {
            var service, cache;

            beforeEach(inject(['bCacheAngular', '$cacheFactory', function(cacheService, $cacheFactory) {
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


        describe('the bCacheFactory', function() {
            var factoryProvider, factory;
            

            describe('', function() {
                beforeEach(module(['bCacheFactoryProvider', function(bCacheFactoryProvider) {
                    factoryProvider = bCacheFactoryProvider;
                }]));
                beforeEach(inject(function() {
                    
                }));
                describe('define a bCacheSystem method that', function() {

                    it('should be defined', function() {
                        expect(factoryProvider.bCacheSystem).toBeDefined();
                    });
                    it('should accept a valid option', function() {
                        factoryProvider.bCacheSystem(factoryProvider.cacheSystems.session);
                        var fn = function(){ factoryProvider.bCacheSystem('invalid'); };

                        expect(fn).toThrow();
                    });
                    
                });


                it('should return the default bCacheAngular instance', inject(['bCacheFactory', 'bCacheAngular', function(factory, cacheAngular) {
                    expect(factoryProvider.bCacheSystem()).toBeUndefined();
                    expect(factory).toBe(cacheAngular);
                    expect(factory.$type).toBe('bCacheAngular');
                }]));
            });

            describe('when configurated', function() {
                beforeEach(module(['bCacheFactoryProvider', function(bCacheFactoryProvider) {
                    factoryProvider = bCacheFactoryProvider;
                    factoryProvider.bCacheSystem(factoryProvider.cacheSystems.session);
                }]));
                
                it('should return the defined provider', inject(['bCacheFactory', 'bCacheSession', function(factory, cacheSession) {
                    expect(factory).toBe(cacheSession);
                    expect(factory.$type).toBe('bCacheSession');
                }]));
            });
        });
    });
})();
