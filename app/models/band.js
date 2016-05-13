import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr(),
  language: DS.attr('string'),
  songs: DS.hasMany('song'),
  slug: Ember.computed('name', function () {
    return this.get('name').dasherize();
  }),
  site: Ember.computed('slug', 'language', function () {
    return 'http://bands.com/' + this.get('slug') + '.' + this.get('language');
  })
});
