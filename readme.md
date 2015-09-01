# angular-resourceCache

An [angular](https://github.com/angular/angular.js) module to cache $resource or promise like objects

## Runing tests
```
karma start

or

gulp karma
```

## Build
```
gulp build
```

## Usage
Add [build/resourceCache.min.js] to your html file
```
<script src="[vendor_folder]/resourceCache.min.js"></script>
```
Add resourceCacheModule as a requirement for your module

```
angular.module('myApp', ['resourceCacheModule']);
```

Use any of the services as cache system

- **resourceCacheFactory** uses the cofigured cache system (resourceCacheAngular by default)
- **resourceCacheSession** uses HTML5 sessionStorage
- **resourceCacheLocal** uses HTML5 localStorage
- **resourceCacheAngular** uses the angular $cacheFactory


## API
### get(key, valueFunction)
Retrieve an object with a $promise resolved with cached object in the given key, if the key does not exist, reject the promise

if valueFunction is undefined and the key does not exist, will call the function to retrieve the value and cache it

when the object is returned from cache, a $origin property will be filled with the cache origin (sessionStorage, localStorage, cache)
```
service('myService', ['resourceCacheFactory', function(cacheFactory) {
	
	/*
		retrieves a previously cached object with the key 'resource/1'
	*/
	cacheFactory.get('resource/1');

	/*
		retrieves a previously cached object with the key 'resource/1' or cache a new one and return it
	*/
	cacheFactory.get('inexistent-resource/1', function() {
		return myResource.get(1);
	});
}]);
```

### set(key, value)
Caches the object into the given key

```
service('myService', ['resourceCacheFactory', function(cacheFactory) {
	/*
		cache myObject into 'resource/1' key
	*/
	cacheFactory.set('resource/1', myObject);
}]);

```

### has(key)
Verify if there is an object cached with the given key

```
service('myService', ['resourceCacheFactory', function(cacheFactory) {
	
	if (cacheFactory.has('resource/1') === true){
		// 'resource/1' has a cached object
	} else {
		// 'resource/1' is not cached
	}
}]);
```

### remove(key)
Remove the cached information of the given key
```
service('myService', ['resourceCacheFactory', function(cacheFactory) {
	//remove 'resource/1' from cache
	cacheFactory.remove('resource/1');
}]);
```

### clear()
Remove all cached items

**WARNING** carefully use with resourceCacheSession and resourceCacheLocal because it will wipe all data from the storages

```
service('myService', ['resourceCacheFactory', function(cacheFactory) {
	cacheFactory.clear();
}]);
```

## resourceCacheFactoryProvider
Used in the config section to define the cache system to be used with **resourceCacheFactory**

### cacheSystems
has the cache options the be used

- session - 'resourceCacheSession'
- local - 'resourceCacheLocal',
- angular - 'resourceCacheAngular'

### resourceCacheSystem(cache)
get or set the cache system to be used

cache can be any of resourceCacheFactoryProvider.cacheSystems

```
config(['resourceCacheFactoryProvider', function(cacheFactoryProvider) {
	
	//Retrieve the current cache System
	cacheFactoryProvider.resourceCacheSystem();

	//define the resourceCacheSession to be used
	cacheFactoryProvider.resourceCacheSystem(cacheFactoryProvider.cacheSystems.session);
}]);
```
