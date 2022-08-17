"use strict";

export class View {
    constructor() {}

    renderUser (user) {
        const userContainer = document.querySelector(`#select_albums`)
        const wrapper = document.createElement(`option`)
        wrapper.classList.add(`person`)
        wrapper.setAttribute(`id`, `${user.id}`)
        wrapper.innerText=`Album №${user.id}`
        userContainer.append(wrapper)
    }

    renderAlbumContainer () {
        const wrapper = document.createElement(`ul`)
        wrapper.classList.add(`albums_container`)
        wrapper.setAttribute(`id`, `albums_container`)
        wrapper.innerHTML=``
        document.body.append(wrapper)
    }

    removeAlbumContainer () {
        document.querySelector(`#albums_container`).remove()
    }

    renderAlbum (album) {
        const albumContainer = document.querySelector(`#albums_container`)
        const wrapper = document.createElement(`li`)
        wrapper.classList.add(`photo`)
        wrapper.setAttribute(`id`, `${album.id}`)
        wrapper.innerHTML=`
        <img src=${album.url} alt="square">
        `
        albumContainer.append(wrapper)
    }

    // renderUser (user) {
    //     const userContainer = document.querySelector(`#users_container`)
    //     const wrapper = document.createElement(`li`)
    //     wrapper.classList.add(`person`)
    //     wrapper.setAttribute(`id`, `${user.id}`)
    //     wrapper.innerHTML=`
    // <span class="person_id">${user.id}</span>
    // <a href="" class="person_title" target="_blank">${user.title}</a>
    // `
    //     userContainer.append(wrapper)
    //     console.log(userContainer)
    // }
}