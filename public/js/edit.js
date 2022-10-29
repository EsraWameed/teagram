const editPost = async function(event){
    event.preventDefault();
    const caption = document.querySelector('#edit-post-caption').value.trim();
    const id =document.querySelector('#post-id-hidden').value.trim();
    const response = await fetch(`/api/pictures/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            caption,
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
    const response = await fetch(`/api/pictures/${id}`, {
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