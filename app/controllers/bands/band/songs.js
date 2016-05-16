import Ember from 'ember';
import { capitalize } from '../../../helpers/capitalize';
const { Controller, computed, isEmpty } = Ember;

export default Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },
  songCreationStarted: false,
  title: '',
  isAddButtonDisabled: computed.empty('title'),
  hasSongs: computed.bool('model.songs.length'),
  canCreateSong: computed.or('songCreationStarted', 'hasSongs'),
  sortBy: 'ratingDesc',
  sortProperties: computed('sortBy', function () {
    var options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc'
    };

    return options[this.get('sortBy')].split(',');
  }),
  sortedSongs: computed.sort('matchingSongs', 'sortProperties'),
  searchTerm: '',
  matchingSongs: computed('model.songs.@each.title', 'searchTerm', function () {
    return this.get('model.songs').filter((song) => {
      var searchTerm = this.get('searchTerm').toLowerCase();

      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),
  newSongPlaceholder: computed('model.name', function () {
    var bandName = this.get('model.name');

    return `New ${capitalize(bandName)} song`;
  }),
  actions: {
    enableSongCreation: function () {
      this.set('songCreationStarted', true);
    },
    updateRating: function (params) {
      let { item: song, rating } = params;

      if (song.get('rating') === rating) {
        rating = null;
      }

      song.set('rating', rating);
      return song.save();
    }
  }
});
