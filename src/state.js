import Vue from 'vue'

function getLocalStorageKey(collection) {
  return `becslink_demo_${collection}`
}

let State = {

  // COLLECTIONS
  collections: ['initiatives', 'schools', 'serviceProviders', 'students', 'esgs'],

  // FIELDS

  initiatives: {},
  schools: {},
  serviceProviders: {},
  students: {},
  esgs: {
    'ESG1': {
      name: 'ESG1',
      goals: {
        'goal1': 34,
        'goal2': 45,
      }
    }
  },

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

  addStudent(student) {
    console.log(`Adding student: ${student.id}`);
    Vue.set(this.students, student.id, Object.assign({}, student))
  },

  addStudents(students) {
    for (let student of students) {
      this.addStudent(student)
    }
    this.updateCollectionInLocalStorage('students')
  },

  deleteESG(name) {
    Vue.delete(this.esgs, name)
    this.updateCollectionInLocalStorage('esgs')
  },

  upsertESG(elem) {
    // TODO remove
    elem.goals = {
      'Goal 1': 12,
      'Goal 2': 34,
      'Goal 3': 23,
    }
    Vue.set(this.esgs, elem.name, Object.assign({}, elem))
    this.updateCollectionInLocalStorage('esgs')
  },

  deleteAllStudents() {
    console.log('Deleting all students')
    Vue.set(this, 'students', {})
    this.updateCollectionInLocalStorage('students')
  },

  // Each goal should have createdAt property
  updateServiceProviderGoal(serviceProvider, goal) {
    console.log(`updating goals for service provider ${serviceProvider}`)
    if (!this.serviceProviders[serviceProvider].goals) {
      Vue.set(this.serviceProviders[serviceProvider], 'goals', {})
    }
    Vue.set(this.serviceProviders[serviceProvider].goals, goal.createdAt, goal)
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
    for (let collection of this.collections) {
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
    Vue.set(this[collection], elem.name, Object.assign({}, elem))
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
    for (let collection of this.collections) {
      console.log(`Removing collection: ${collection}`)
      this.clearCollection(collection)
    }
  },
}

export default State