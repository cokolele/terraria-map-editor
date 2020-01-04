const fetchErrorDefault = (e) => {
    console.error(e);
    return {
        status: "error",
        message: "network error (check console for more details)"
    };
}

const get = async (resource = "/") => {
    try {
        const response = await fetch("/api" + resource, {
            headers: {
                "Accept": "application/json"
            },
            credentials: "include"
        });

        return await response.json();
    } catch (e) {
        return fetchErrorDefault(e);
    }
};

const delete_ = async (resource = "/") => {
    try {
        const response = await fetch("/api" + resource, {
            method: "DELETE",
            credentials: "include"
        });

        return await response.json();
    } catch (e) {
        return fetchErrorDefault(e);
    }
};

const post = async (resource = "/", body = {}) => {
    try {
        const response = await fetch("/api" + resource, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        });

        return await response.json();
    } catch (e) {
        return fetchErrorDefault(e);
    }
}

const put = async (resource = "/", body = {}) => {
    try {
        const response = await fetch("/api" + resource, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        });

        return await response.json();
    } catch (e) {
        return fetchErrorDefault(e);
    }
}

const patch = async (resource = "/", body = {}) => {
    try {
        const response = await fetch("/api" + resource, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        });

        return await response.json();
    } catch (e) {
        return fetchErrorDefault(e);
    }
}

export default {
    get,
    delete: delete_,
    post,
    put,
    patch
};