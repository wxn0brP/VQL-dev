export type EventHandler<Payload> = (payload: Payload) => void;

export class EventBus<Events extends Record<string, any>> {
    private listeners: {
        [K in keyof Events]?: Set<EventHandler<Events[K]>>
    } = {};

    on<K extends keyof Events>(eventName: K, handler: EventHandler<Events[K]>): () => void {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = new Set();
        }
        this.listeners[eventName]!.add(handler);

        return () => this.off(eventName, handler);
    }

    off<K extends keyof Events>(eventName: K, handler: EventHandler<Events[K]>) {
        this.listeners[eventName]?.delete(handler);
        if (this.listeners[eventName]?.size === 0) {
            delete this.listeners[eventName];
        }
    }

    emit<K extends keyof Events>(eventName: K, payload: Events[K]) {
        if (!this.listeners[eventName]) return;
        for (const handler of this.listeners[eventName]!) {
            try {
                handler(payload);
            } catch (e) {
                console.error(`Error in handler for event "${String(eventName)}":`, e);
            }
        }
    }

    hasListeners<K extends keyof Events>(eventName: K): boolean {
        return !!this.listeners[eventName] && this.listeners[eventName]!.size > 0;
    }
}

export default EventBus;