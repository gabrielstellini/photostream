// InterceptionObserver is not natively supported in Jest runner
const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

class IntersectionObserver {
  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;

  constructor(callback) {
    this.callback = callback;
  }
}

global.IntersectionObserver = IntersectionObserver;
