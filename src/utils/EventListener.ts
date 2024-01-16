type Callback = (params: unknown) => void;
type Listener = {
  [id: string]: Callback[];
};

/**
 * Event listener class
 *
 * @example
 * // ------------ Basic Usage ------------
 * // Outside of component
 * const Listener = new EventListener();
 *
 * // Inside component 1
 * useEffect(() => {
 *    const unSubs = Listener.subscribe('event', callBack);
 *    return unSubs;
 * }, []);
 *
 * // Inside component 2
 * const onPress = useCallback(() => {
 *    Listener.propogate('event', params);
 * }, [params]);
 * // ---------- Basic Usage End  ----------
 */
export class EventListener {
  private _listeners: Listener = {};

  /**
   * Subscribe to an event with a callback function
   * @param id Event name
   * @param callback Callback function to be called when event is propogated
   * @returns Unsubscribe function
   */
  public subscribe(id: string, callback: any) {
    if (!this._listeners[id]) {
      this._listeners[id] = [];
    }
    this._listeners[id].push(callback as Callback);
    return () => {
      this._listeners[id] = this._listeners[id]?.filter(listener => listener !== callback);
    };
  }

  /**
   * Remove all listeners of an event
   * @param id Event name
   */
  public unsubscribe(id: string) {
    delete this._listeners[id];
  }

  /**
   * Propogate an event with parametersin
   * @param id Event name
   * @param params Parameters to be passed to callback function
   */
  public propogate(id: string, params?: unknown) {
    if (this._listeners[id]) {
      this._listeners[id]?.forEach((listener, index) => {
        try {
          listener(params);
        } catch (error) {
          // eslint-disable-next-line no-console
          __DEV__ && console.log(`Propogate failed on event ${id} and index ${index}`, error);
        }
      });
    }
  }
}
