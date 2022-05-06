import './style.css';

import { of, map, concat, combineLatest, Observable, Observer } from 'rxjs';

//of('World', 'LKF')
//  .pipe(map((name) => `Hello, ${name}!`))
//  .subscribe(console.log);
//
// Open the console in the bottom right to see results.

class CachedImageLoader {
  private local_cache = {};
  load_image(key) {
    var local$ = new Observable((observer: Observer) => {
      console.log('local_cache=' + this.local_cache[key]);
      if (this.local_cache[key]) {
        observer.next('image from local: ' + this.local_cache[key]);
      } else {
        observer.complete();
      }
    });

    var network$ = new Observable((observer: Observer) => {
      this.local_cache[key] = key + '-data';
      observer.next('image from network');
      observer.complete();
    });
    concat(local$, network$).subscribe((x, y) => {
      console.log(x, y);
    });
  }
}

var key = `IMG001`;
var loader = new CachedImageLoader();
loader.load_image(key);
loader.load_image(key);
