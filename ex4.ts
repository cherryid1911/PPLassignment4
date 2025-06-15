//Q1
export function all<T>(promises : Array<Promise<T>>) : Promise<Array<T>> {

  return new Promise<T[]>( (resolve, reject) => {
    const results: T[] = new Array(promises.length);
    let count = 0;
    let failed = false;
    promises.map((p, i) =>
      p.then(value => {
        if (failed) return;
        results[i] = value;
        ++count === promises.length ? resolve(results) : null;
      }).catch(err => failed ? null : (failed = true, reject(err)))
    );
    promises.length === 0 ? resolve([]) : null;
  });
}

  
// Q2
export function* Fib1() {
	// @TODO
  return undefined;
}


export function* Fib2() {
	// @TODO
  return undefined;
}
