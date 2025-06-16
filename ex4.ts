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
	let a=0, b=1, temp=0;
  while (true) {
    yield b;
    temp = a + b;
    a = b;
    b = temp;
  }
}


export function* Fib2() {
	let n=1, phi=(1+Math.sqrt(5))/2, psi=(1-Math.sqrt(5))/2;
  while (true) {
    yield Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5));
    n++;
  }
}
