import { useParams } from "react-router"
import { useBlog } from "../hooks"
import { FullBlog } from "./FullBlog"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { Appbar } from "../components/Appbar"
import { Spinner } from "../components/Spinner"
import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { blogAtomFamily } from "../atoms"

export const Blog = () => {
    const { id } = useParams()
    const blog = useRecoilValueLoadable(blogAtomFamily(id))

    if (blog.state === "loading") {
        return (
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="">
            <FullBlog blog={blog.contents}/>
        </div>
    )
}