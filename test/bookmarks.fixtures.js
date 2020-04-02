function makeBookmarksArray() {
  return [
    {
      title: 'Google',
      site_url: 'http://google.com',
      site_description: 'An indie search engine startup',
      rating: 4
    },
    {
      title: 'Fluffiest Cats in the World',
      site_url: 'http://medium.com/bloggerx/fluffiest-cats-334',
      site_description: 'The only list of fluffy cats online',
      rating: 5
    },
    {
      title: 'Alligator',
      site_url: 'https://alligator.io/',
      site_description: 'Learn coding stuffs',
      rating: 4
    },
    {
      title: 'Yahoo',
      site_url: 'https://www.yahoo.com/',
      site_description: 'Rather unfortunate',
      rating: 2
    }
  ];
}

function makeMaliciousBookmark() {
  const maliciousBookmark = {
    id: 911,
    title: 'Badguy bookmark attack <script>alert("xss");</script>',
    site_url: 'https://imabadguy.com',
    site_description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
  };
  const expectedBookmark = {
    ...maliciousBookmark,
    title: 'Badguy bookmark attack &lt;script&gt;alert("xss");&lt;/script&gt;',
    site_description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  };

  return {
    maliciousBookmark,
    expectedBookmark
  };
}

module.exports = {
  makeBookmarksArray,
  makeMaliciousBookmark
};
