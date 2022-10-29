// const newPostForm = async function(event) {
//     event.preventDefault();

    
//     const caption = document.querySelector('#caption').value.trim();

//     const response = await fetch(`/api/pictures`, {
//         method: 'POST',
//         body: JSON.stringify({
//             caption,
//         }),
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert(response.statusText);
//     }
// };

// document.querySelector('#new-post').addEventListener('submit', newPostForm);