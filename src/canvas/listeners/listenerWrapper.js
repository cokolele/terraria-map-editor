export default function(listener) {
    return function(event) {
        try {
            listener(event);
        } catch(e) {
            console.error(event.type + " listener error:", e)
        }
    }
};