import Vue from 'vue'

function getLocalStorageKey(collection) {
  return `becslink_demo_${collection}`
}

let State = {
  // FIELDS

  initiatives: {},
  schools: {},
  serviceProviders: {},

  hacks: {},

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

  // Each goal should have createdAt property
  updateServiceProviderGoal(serviceProvider, goal) {
    console.log(`updating goals for service provider ${serviceProvider}`)
    if (!this.serviceProviders[serviceProvider].goals) {
      Vue.set(this.serviceProviders[serviceProvider], 'goals', {})
    }
    Vue.set(this.serviceProviders[serviceProvider].goals, goal.createdAt, Object.assign({}, goal))
    this.updateCollectionInLocalStorage('serviceProviders')
  },

  deleteServiceProviderGoal(serviceProvider, goal) {
    console.log(`deleting goal "${goal.name}" for service provider ${serviceProvider}`)
    Vue.delete(this.serviceProviders[serviceProvider].goals, goal.createdAt)
    this.updateCollectionInLocalStorage('serviceProviders')
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
    this.updateCollectionInLocalStorage(collection)
  },

  clearCollection(collection) {
    Vue.set(this, collection, {});
    this.updateCollectionInLocalStorage(collection)
  },

  clearState() {
    for (let collection of ['initiatives', 'schools', 'serviceProviders']) {
      console.log(`Removing collection: ${collection}`)
      this.clearCollection(collection)
    }
  },
}

export default State