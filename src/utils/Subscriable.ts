export type SubscriableCb<T> = (v: T) => void;

export class Subscriable<T> {
  private cbs: Set<SubscriableCb<T>> = new Set();

  public subscribe = (cb: SubscriableCb<T>) => this.cbs.add(cb);

  public unsubscribe = (cb: SubscriableCb<T>) => this.cbs.delete(cb);

  public publish = (v: T) =>
    this.cbs.forEach(cb => {
      try {
        cb(v);
      } catch (e) {
        // swallow
      }
    });
}
