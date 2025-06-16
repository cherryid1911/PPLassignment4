import { expect, assert } from 'chai';
import { all, Fib1, Fib2 } from '../ex4';

//Q1
function p1() { // always succeeds, with content 1
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(1); }, Math.random() * 1000);
  });
}

function p2() { // always succeeds, with content 2
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(2); }, Math.random() * 1000);
  });
}

function p3() {  // always fails, with err 3
  return new Promise((resolve, reject) => {
    setTimeout(() => { reject(3); }, Math.random() * 1000);
  });
}

const take = <T>(n : number , generator : Iterator<T>) =>
  take1(n,generator, []);

const take1 = <T>(n : number , generator : Iterator<T>, acc : T[]) : T[] => {
    const ir = generator.next();
    if (n <= 0 || ir.done)
      return acc
    return take1(n-1,generator,acc.concat([ir.value]));
}

describe('Q1 Tests', () => {
    
    it("Q1 test 1", async () => {
        await all([p1(),p2()]).then(content => {
            expect(content).to.deep.equal([1,2])
        }).catch(err => {
            assert.fail("Q1 test 1 failed");
        })
    })

    it("Q1 test 2", async () => {
        await all([p1(),p3()]).then(content => {
            assert.fail("Q1 test 2 failed")
        }).catch(err => {
            assert(err === 3,"Q1 test 2 failed")
        })
    })

    it("Q1 test 3 - empty array should resolve to []", async () => {
    await all([]).then(content => {
        expect(content).to.deep.equal([]);
    }).catch(err => {
        assert.fail("Q1 test 3 failed");
    });
  })

    it("Q1 test 4 - single promise", async () => {
    await all([p2()]).then(content => {
        expect(content).to.deep.equal([2]);
    }).catch(err => {
        assert.fail("Q1 test 4 failed");
    });
    })

    it("Q1 test 5 - single rejected promise", async () => {
    await all([p3()]).then(content => {
        assert.fail("Q1 test 5 failed");
    }).catch(err => {
        expect(err).to.equal(3);
    });
    })

    it("Q1 test 6 - one rejected among multiple promises", async () => {
    await all([p1(), p3(), p2()]).then(content => {
        assert.fail("Q1 test 6 failed");
    }).catch(err => {
        expect(err).to.equal(3);
    });
    })

    it("Q1 test 7 - order is preserved", async () => {
    await all([p2(), p1()]).then(content => {
        expect(content).to.deep.equal([2, 1]);
    }).catch(err => {
        assert.fail("Q1 test 7 failed");
    });
});
});


describe('Q2 Tests', () => {

    it("Q2 test 1", () => {
      expect(take(10, Fib1())).to.deep.equal([1,1,2,3,5,8,13,21,34,55]);
    })

    it("Q2 test 2", () => {
      expect(take(10, Fib2())).to.deep.equal([1,1,2,3,5,8,13,21,34,55]);
    })

    it("Q2 test 3", () => {
      expect(take(1, Fib1())).to.deep.equal([1]);
    })

    it("Q2 test 4", () => {
      expect(take(1, Fib2())).to.deep.equal([1]);
    })

    it("Q2 test 5", () => {
      expect(take(20, Fib1())).to.deep.equal([1,1,2,3,5,8,13,21,34,55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]);
    })

    it("Q2 test 6", () => {
      expect(take(20, Fib2())).to.deep.equal([1,1,2,3,5,8,13,21,34,55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]);
    })

    it("Q2 test 7", () => {
      expect(take(0, Fib1())).to.deep.equal([]);
    })

    it("Q2 test 8", () => {
      expect(take(0, Fib2())).to.deep.equal([]);
    })
});