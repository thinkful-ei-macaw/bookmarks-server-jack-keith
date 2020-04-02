const BookmarksService = {
  getAllBookmarks(knexInstance) {
    return knexInstance('bookmarks').select('*');
  },
  getBookmarkById(knexInstance, id) {
    return knexInstance('bookmarks').select('*').where('id', id).first();
  },
  insertBookmark(knexInstance, newBookmark) {
    return knexInstance('bookmarks')
      .insert(newBookmark)
      .returning('*')
      .then(rows => rows[0]);
  },
  updateBookmark(knexInstance, id, newData) {
    return knexInstance('bookmarks').where({ id }).update(newData);
  },
  deleteBookmark(knexInstance, id) {
    return knexInstance('bookmarks').where({ id }).delete();
  }
};

module.exports = BookmarksService;
