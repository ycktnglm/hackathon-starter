const natural = require('natural')

const semanticsFood = ['food', 'drink', '#badFood', '#japan2016', 'restaurant', 'sushi', 'ramen']
const semanticsNature = ['nature japan', 'surf', 'hike', 'swim', 'walk', 'sport', 'water', 'explore', 'trail']
const semanticsCulture = ['tower', 'museum', 'tour', 'temple', 'monument', 'heritage']

function parseAllTagTuples(tfidf, wordList, name) {
  var score = 0.0

  // tfidf
  for (index in wordList) {
    const phrase = wordList[index]

    tfidf.tfidfs(phrase, function(i, measure) {
        score += measure
    });
  }
  console.log('score#' + name + ': ' + score)
  return score
}

function getRatingByPosts(posts) {
  
  // quick tf-idf this
  const TfIdf = natural.TfIdf
  var tfidf = new TfIdf()

  for (var index in posts) {
    const data = posts[index]

    // tfidf
    tfidf.addDocument(data.message)

  }

  const scoreFood = parseAllTagTuples(tfidf, semanticsFood, 'food')
  const scoreNature = parseAllTagTuples(tfidf, semanticsNature, 'nature')
  const scoreCulture = parseAllTagTuples(tfidf, semanticsCulture, 'culture')

  let ratings = [{ name: 'food', rating: scoreFood }, 
  {name: 'nature', rating: scoreNature }, 
  {name: 'culture', rating: scoreCulture }]

  ratings.sort(function(a, b) {
    return b.rating - a.rating
  })

  return { ratings: ratings }
}

module.exports = { evaluate: getRatingByPosts }