const newPostForm = async function(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-body').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
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
};

document.querySelector('#new-post').addEventListener('submit', newPostForm);