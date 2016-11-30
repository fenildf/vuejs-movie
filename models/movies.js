

module.exports = {

    add: function add(movie) {
        return Movie.create(movie).exec();

    },

    getMovieById: function getMovieById(id) {
        return Movie.findOne({_id:id}).exec();
    },

    getMovies: function getMovies() {
        return Movie.sort({_id: -1}).exec();
    },

    updateMovieById: function(id, data) {
        return Movie.update({$set: data}).exec();
    },

    delMovieById: function(id) {
        return Movie.remove({_id:id}).exec();
    }
}