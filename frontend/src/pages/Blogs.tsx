import { useRecoilValueLoadable } from "recoil"
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { Blog, useBlogs } from "../hooks"
import { blogBulkAtomFamily } from "../atoms"

 export const Blogs = () => {
    const blogs = useRecoilValueLoadable(blogBulkAtomFamily(""))

    if (blogs.state === "loading") {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    {blogs.contents.map((blog: Blog) => <BlogCard id={blog.id} authorName={blog.author.name || "Akhilesh M"}
                        title={blog.title} 
                        content={blog.content}
                        publishedDate="2nd Feb 2024" />)}
                </div>
            </div>
        </div>
    )
 }