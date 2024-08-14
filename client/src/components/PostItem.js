
function PostItem({ post }) {
    return (
        <>
            <div className='postItem'>
                <h2 className='postItemUsername'>{post.user.username}</h2>
                <h3 className='postItemName'>{post.user.name}</h3>
                <h3 className='postItemContent'>{post.content}</h3>
                <h4 className='postItemTimeStamp'>{post.timestamp}</h4>
            </div>
        </>
    )
}

export default PostItem;