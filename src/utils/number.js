const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

const sharedRestrainedRangeChange = (value, index, min, max, ...x) => {
    if (value < min)
        value = min;
    if (value > max)
        value = max;

    if (value > x[index]) {
        let highest = x[index] = value;
        for (let i = index+1; i < x.length; i++) {
            if (x[i] < highest) {
                x[i] = highest;
            } else {
                if (x[i] <= max)
                    highest = x[i]
                else
                    highest = x[i] = max;
            }
        }
    } else {
        let lowest = x[index] = value;
        for (let i = index-1; i >= 0; i--) {
            if (x[i] > lowest) {
                x[i] = lowest;
            } else {
                if (x[i] >= min)
                    lowest = x[i];
                else
                    lowest = x[i] = min;
            }
        }

    }

    return x;
}

export {
    map,
    sharedRestrainedRangeChange
};