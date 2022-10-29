const editPost = async function(event){
    event.preventDefault();
    const title = document.querySelector('#edit-post-title').value.trim();
    const description = document.querySelector('#edit-post-body').value.trim();
    const id =document.querySelector('#post-id-hidden').value.trim();
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

const deletePost = async function(event){
    event.preventDefault();
    
    const id =document.querySelector('#post-id-hidden').value.trim();
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-form').addEventListener('submit', editPost);

document.querySelector('#delete-btn').addEventListener('click', deletePost);