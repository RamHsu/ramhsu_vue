import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n) ;

const messages = {
  chinese: require('./lang-zh.js'),
  english: require('./lang-en.js')
} ;

export default new VueI18n({
    locale: 'chinese' ,
    messages
}) ;
