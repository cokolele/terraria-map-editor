const fetchErrorDefault = (e) => {
    console.error("Auth call error:", e);
    return {
        status: "error",
        message: "Unexpected network error"
    };
}

const get = async (resource = "/", contentType = "application/json") => {
    try {
        const options = {
            credentials: "include",
        };

        if (contentType) {
            options.headers = {};
            options.headers["Accept"] = contentType
        }

        const response = await fetch("/auth" + resource, options);

        return contentType == "application/json" ? await response.json() : await response.blob();
    } catch (e) {
        return fetchErrorDefault(e);
    }
};

const delete_ = async (resource = "/") => {
    try {
        const response = await fetch("/auth" + resource, {
            method: "DELETE",
            credentials: "include"
        });

        return await response.json();
    } catch (e) {
        return fetchErrorDefault(e);
    }
};

const post = async (resource = "/", body = {}, contentType = "application/json") => {
    try {
        const options = {
            method: "POST",
            credentials: "include",
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        if (contentType) {
            options.headers = {};
            options.headers["Content-Type"] = contentType
        }

        const response = await fetch("/auth" + resource, options);
        return await response.json();
    } catch (e) {
        return fetchErrorDefault(e);
    }
}

const put = async (resource = "/", body = {}, contentType = "application/json") => {
    try {
        const options = {
            method: "PUT",
            credentials: "include",
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        if (contentType) {
            options.headers = {};
            options.headers["Content-Type"] = contentType
        }

        const response = await fetch("/auth" + resource, options);
        return await response.json();
    } catch (e) {
        return fetchErrorDefault(e);
    }
}

const patch = async (resource = "/", body = {}, contentType = "application/json") => {
    try {
        const options = {
            method: "PATCH",
            credentials: "include",
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        if (contentType) {
            options.headers = {};
            options.headers["Content-Type"] = contentType
        }

        const response = await fetch("/auth" + resource, options);
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