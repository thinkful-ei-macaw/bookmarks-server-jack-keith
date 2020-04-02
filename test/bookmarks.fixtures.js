function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: 'Google',
      site_url: 'http://google.com',
      site_description: 'An indie search engine startup',
      rating: 4
    },
    {
      id: 2,
      title: 'Fluffiest Cats in the World',
      site_url: 'http://medium.com/bloggerx/fluffiest-cats-334',
      site_description: 'The only list of fluffy cats online',
      rating: 5
    },
    {
      id: 3,
      title: 'Alligator',
      site_url: 'https://alligator.io/',
      site_description: 'Learn coding stuffs',
      rating: 4
    },
    {
      id: 4,
      title: 'Yahoo',
      site_url: 'https://www.yahoo.com/',
      site_description: 'Rather unfortunate',
      rating: 2
    }
  ];
}

module.exports = {
  makeBookmarksArray
};
