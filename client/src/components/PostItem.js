
function PostItem({ post }) {
    return (
        <>
            <main>
                <div>
                    <h2>{post.user.username}</h2>
                    <h3>{post.user.name}</h3>
                    <h3>{post.content}</h3>
                    <h4>{post.timestamp}</h4>
                </div>
            </main>
        </>
    )
}

export default PostItem;