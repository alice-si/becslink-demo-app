import Vue from 'vue'

function getLocalStorageKey(collection) {
  return `becslink_demo_${collection}`
}

let State = {
  // FIELDS

  initiatives: {},
  schools: {},
  serviceProviders: {},

  // METHODS

  // Initiative is identified by name
  upsertInitiative(initiative) {
    this.defaultUpsert(initiative, 'initiatives')
  },

  // School is identified by name
  upsertSchool(school) {
    this.defaultUpsert(school, 'schools')
  },

  // Service provider is identified by name
  // Service provider has an array of goals
  upsertServiceProvider(serviceProvider) {
    this.defaultUpsert(serviceProvider, 'serviceProviders')
  },

  deleteInitiative(name) {
    this.defaultDelete(name, 'initiatives');
  },

  loadCollectionDataFromLocalStorage(collection) {
    try {
      console.log(`Loading ${collection} data from local storage`)
      const localStorageStrVal = localStorage[getLocalStorageKey(collection)]
      if (!localStorageStrVal) {
        return
      }
      const data = JSON.parse(localStorageStrVal)
      Vue.set(this, collection, data)
    } catch (e) {
      console.log(e)
    }
  },

  // It should be called once when the app is loaded
  loadStateFromLocalStorage() {
    for (let collection of ['initiatives', 'schools', 'serviceProviders']) {
      this.loadCollectionDataFromLocalStorage(collection)
    }
  },

  // It should be called on each collection update
  updateCollectionInLocalStorage(collection) {
    localStorage[getLocalStorageKey(collection)] =
      JSON.stringify(this[collection])
  },

  defaultUpsert(elem, collection) {
    console.log(`Updating collection: ${collection}`)
    Vue.set(this[collection], elem.name, elem)
    this.updateCollectionInLocalStorage(collection)
  },

  defaultDelete(name, collection) {
    console.log(`Deleting el ${name} from ${collection}`);
    let newCollection = Object.assign({}, this[collection]);
    delete newCollection[name];
    Vue.set(this, collection, newCollection);
    this.updateCollectionInLocalStorage(collection);
  },
}

export default State