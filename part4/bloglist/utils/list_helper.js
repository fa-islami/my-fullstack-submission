const dummy = (blogs) => {
  blogs.map((b) => b);
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
