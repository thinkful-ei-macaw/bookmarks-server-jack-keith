function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: 'Google',
      url: 'http://google.com',
      desc: 'An indie search engine startup',
      rating: 4
    },
    {
      id: 2,
      title: 'Fluffiest Cats in the World',
      url: 'http://medium.com/bloggerx/fluffiest-cats-334',
      desc: 'The only list of fluffy cats online',
      rating: 5
    },
    {
      id: 3,
      title: 'Alligator',
      url: 'https://alligator.io/',
      desc: 'Learn coding stuffs',
      rating: 4
    },
    {
      id: 4,
      title: 'Yahoo',
      url: 'https://www.yahoo.com/',
      desc: 'Rather unfortunate',
      rating: 2
    }
  ];
}

module.exports = {
  makeBookmarksArray
};
