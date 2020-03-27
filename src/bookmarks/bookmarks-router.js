const express = require('express');
const bookmarksData = require('../store/store');
const uuid = require('uuid/v4');
const logger = require('../logger');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('/')
  .get((req, res) => {
    res.json(bookmarksData);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, desc = '', rating = 1 } = req.body;
    if (!title) {
      logger.error('Title is required');
      return res.status(400).send('Title is required');
    }
    if (!url) {
      logger.error('Url is required');
      return res.status(400).send('Url is required');
    }
    if (url.length < 5) {
      logger.error('Url length is wrong');
      return res.status(400).send('Url length must be 5 or greater');
    }
    //if they pass a letter like a, Number(rating) will return NaN
    if (!Number(rating)) {
      logger.error('Rating is not a number');
      return res.status(400).send('Rating must be a number');
    }
    //+ is a Uninary operator converts to number value
    if (+rating < 1 || +rating > 5) {
      logger.error('Rating is not between 1 and 5');
      return res
        .status(400)
        .send('Rating cannot be less than 1 or greater than 5');
    }

    const id = uuid();
    const bookmark = {
      id,
      title,
      url,
      desc,
      rating
    };

    bookmarksData.push(bookmark);
    logger.info(`Bookmark with id ${id} created`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`) //Comes back as a header in postman
      .json(bookmark);
  });

//Note express finds the first matching route
bookmarksRouter
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarksData.find(bookmark => bookmark.id === id);
    //since bookmarks is not found it is undefined which is a falsy value
    if (!bookmark) {
      logger.error(`Bookmark with id ${id} was not found`);
      return res.status(404).send('404 NOT FOUND');
    }
    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookIndex = bookmarksData.findIndex(
      bookmarkId => bookmarkId.id === id
    );

    if (bookIndex === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res.status(404).send('Id not found');
    }

    bookmarksData.splice(bookIndex, 1);
    logger.info(`Bookmark with id ${id} deleted`);
    res.status(204).end();
  });

module.exports = bookmarksRouter;
