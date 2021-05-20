const fetch = require('node-fetch');




async function fetchPost(route, body, jwt ) {

    const bearer = 'Bearer ' + jwt;

    const response = await fetch(`https://marc.budgetapi.speurholdings.com/${route}`, {
        method: 'POST',
        headers: {
        'Authorization': bearer,
        "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    }
    return data
}

async function fetchPut(route, body, jwt ) {

    const bearer = 'Bearer ' + jwt;

    const response = await fetch(`https://marc.budgetapi.speurholdings.com/${route}`, {
        method: 'PUT',
        headers: {
        'Authorization': bearer,
        "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    }
    return data
}



async function fetchGet (route, jwt) {



    const bearer = 'Bearer ' + jwt;

    const response = await fetch(`https://marc.budgetapi.speurholdings.com/${route}`, {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json',

        },
    })

    if (!response.ok) {

        throw new Error('Failure to retrieve')
    }

    const data = await response.json()
    return data

    
}

// async function fetchDelete (route, jwt) {

//     const bearer = 'Bearer ' + jwt;

//     const response = await fetch(`https://marc.budgetapi.speurholdings.com/${route}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': bearer,
//             'Content-Type': 'application/json',

//         },
//     })

//     if (!response.ok) {

//         throw new Error('Failure to retrieve')
//     }

//     const data = await response.json()
//     return data

    
// }

module.exports = { fetchGet, fetchPost, fetchPut}