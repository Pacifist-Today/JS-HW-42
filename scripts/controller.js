"use strict";

export class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    handlers = () => {
        document.addEventListener(`DOMContentLoaded`, this.loadHandler)
        document.querySelector(`#select_albums`).addEventListener(`change`, this.selectHandler)
        document.querySelector(`#clear_page`).addEventListener(`click`, this.clearHandler)
        document.querySelector(`#search_by_number`).addEventListener('input', this.searchHandler)
    }

    loadHandler = () => {
        const idListUrl = `https://jsonplaceholder.typicode.com/albums`
        fetch(idListUrl)
            .then(response => response.json())
            .then(response => {
                this.model.setData(response)
                response.forEach(user => this.view.renderUser(user))
            })
            .catch(response => new Error(`some error`))
    }

    selectHandler = (e) => {
        e.stopPropagation()
        const userId = e.target.value.slice(7)
        console.log(userId)
        const albumsListUrl = `https://jsonplaceholder.typicode.com/photos?albumId=${userId}`
        fetch(albumsListUrl)
            .then(response => response.json())
            .then(albums => {
                const albumsContainer = document.querySelector(`#albums_container`)

                if (albumsContainer) {
                    this.view.removeAlbumContainer()
                    this.view.renderAlbumContainer()
                }   else if (!albumsContainer) {
                    this.view.renderAlbumContainer()
                }
                document.querySelector(`#current_album`).innerText=`Current album: ${userId}`
                albums.forEach(album => this.view.renderAlbum(album))
            })
        document.querySelector(`#search_by_number`).value = userId
    }

    clearHandler = (e) => {
        const albumsContainer = document.querySelector(`#albums_container`)
        if (!albumsContainer) return
        if (albumsContainer) this.view.removeAlbumContainer()
        document.querySelector(`#current_album`).textContent = `Choose album`
        document.querySelector(`#select_albums`).selectedIndex = 0;
        document.querySelector(`#search_by_number`).value = ``
    }

    searchHandler = (e) => {
        const value = e.target.value
        if (value > 100 || value < 1) return;

        document.querySelector(`#current_album`).textContent = `Current album: ${value}`
        document.querySelector(`#select_albums`).selectedIndex = value;

        const albumsListUrl = `https://jsonplaceholder.typicode.com/photos?albumId=${value}`
        fetch(albumsListUrl)
            .then(response => response.json())
            .then(albums => {
                const albumsContainer = document.querySelector(`#albums_container`)

                if (albumsContainer) {
                    this.view.removeAlbumContainer()
                    this.view.renderAlbumContainer()
                } else if (!albumsContainer) {
                    this.view.renderAlbumContainer()
                }
                document.querySelector(`#current_album`).innerText=`Current album: ${value}`
                albums.forEach(album => this.view.renderAlbum(album))
            })
            .catch(response => new Error(`some Error`))
    }
}