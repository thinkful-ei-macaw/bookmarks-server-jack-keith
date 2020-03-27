const express = require('express');
const bookmarksData = require('../store/store')
const uuid = require('uuid/v4');
const bookmarksRouter = (express.Router())
const bodyParser = (express.json());
bookmarksRouter.route('/')
    .get((req, res) => {
        res.json(bookmarksData)
    })
    .post(bodyParser, (req, res) => {
        const { title, url, desc = "", rating = 1 } = req.body
        if (!title) {
            return res.status(400).send('Title is required')
        }
        if (!url) {
            return res.status(400).send('Url is required')
        }
        if (url.length < 5) {
            return res.status(400).send('Url length must be 5 or greater')
        }
        //if they pass a letter like a, Number(rating) will return NaN
        if (!Number(rating)) {
            return res.status(400).send('Rating must be a number')
        }
        //+ is a Uninary operator converts to number value
        if (+rating < 1 || +rating > 5) {
            return res.status(400).send('Rating cannot be less than 1 or greater than 5')
        }

        const id = uuid();
        const bookmark = {
            id, title, url, desc, rating
        }

        bookmarksData.push(bookmark)
        res.status(201).location(`http://localhost:8000/bookmarks/${id}`)//Comes back as a header in postman
            .json(bookmark)

    })

//Note express finds the first matching route
bookmarksRouter.route('/:id')

    .get((req, res) => {
        console.log(req.params)
        const bookmark = bookmarksData.find(bookmark => bookmark.id === req.params.id)
        //since bookmarks is not found it is undefined which is a falsy value
        if (!bookmark) {
            return res.status(404).send('404 NOT FOUND')
        }
        res.json(bookmark)
    })
    .delete((req, res) => {
        const { id } = req.params
        const bookIndex = bookmarksData.findIndex(bookmarkId => bookmarkId.id === id)

        if (bookIndex === -1) {
            return res
                .status(404)
                .send('Id not found')
        }

        bookmarksData.splice(bookIndex, 1)
        res.status(204).end()

    })




module.exports = bookmarksRouter