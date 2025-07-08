const eventMap = new Map();
const EVENTS_KEYS = {
    // Add your events here
    // Example:
    table: {
        loading: 'table:filter:loading',
        clearFilter: 'table:filter:clear',
        clear: 'table:selected:clear',
    },
};
export const useEvents = () => {
    const on = (event, callback) => {
        if (!eventMap.has(event)) {
            eventMap.set(event, []);
        }
        eventMap.get(event).push(callback);
    };
    const off = (event, callback) => {
        if (!eventMap.has(event)) {
            return;
        }
        const callbacks = eventMap.get(event);
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    };
    const emit = (event, ...args) => {
        if (!eventMap.has(event)) {
            return;
        }
        const callbacks = eventMap.get(event);
        for (const callback of callbacks) {
            callback(...args);
        }
    };
    return {
        on,
        off,
        emit,
        keys: EVENTS_KEYS,
    };
};
