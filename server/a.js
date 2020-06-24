const Article = require('../model/article');

async function getByTag() {
    console.log('GET BY TAG');
    const articles = await Article.find().limit(1);
    console.log(articles);
    return articles;
}

module.exports = { getByTag };