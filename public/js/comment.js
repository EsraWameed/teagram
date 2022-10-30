const postComment = async (event) => {
    event.preventDefault();

    const comment_description = document.querySelector('#add-comment').value.trim();
    const picture_id =document.querySelector('#post-id-hidden-comment').value.trim();
    console.log(picture_id);
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            comment_description,
            picture_id,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

const postLike = async (event) => {
    event.preventDefault();

    const liked = document.querySelector('#like-status').innerHTML;
    
    const picture_id =document.querySelector('#post-id-hidden-comment').value.trim();
    console.log(liked);
    const response = await fetch(`/api/likes`, {
        method: 'POST',
        body: JSON.stringify({
            
            picture_id,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
        
        
        document.location.reload();
    } else {
        alert(response.statusText);
    }
    
}

document.querySelector('#likebtn').addEventListener('click', postLike);

document.querySelector('#comment-form').addEventListener('submit', postComment);