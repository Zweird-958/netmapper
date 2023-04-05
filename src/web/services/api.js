import config from "@/web/config.js"
import axios from "axios"
import deepmerge from "deepmerge"

const call =
  (method) =>
  (path, data = null, options = {}) => {
    options.headers = deepmerge(options.headers)

    const opts = {
      baseURL: config.api.baseURL,
      ...options,
    }

    return axios[method](path, method === "get" ? opts : data, opts)
  }

const api = {
  post: call("post"),
  get: call("get"),
  patch: call("patch"),
  delete: call("delete"),
}

export default api
