import axios from "axios";
import { atom, atomFamily, selectorFamily } from "recoil";
import { BACKEND_URL } from "./config";

export const blogAtomFamily = atomFamily({
    key: "blogAtomFamily",
    default: selectorFamily({
        key: "blogSelectorFamily",
        get: (id: string | undefined) => async ({get}) => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data.blog
        }
    })
})

export const blogBulkAtomFamily = atomFamily({
    key: "blogBulkAtomFamily",
    default: selectorFamily({
        key: "blogBulkSelectorFamily",
        get: () => async ({get}) => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data.blog
        }
    })
})