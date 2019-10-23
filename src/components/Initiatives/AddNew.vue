<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <!-- <slot></slot> -->
                <div>
                  <h3>Add new {{ entityTitle }}</h3>

                  <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input v-model="inputs.name" class="mdl-textfield__input" type="text" id="name">
                    <label class="mdl-textfield__label" for="sample1">Name</label>
                  </div>

                  <button @click="save()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Save
                  </button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import state from '../../state'

export default {
    props: {
      collection: String,
      entityTitle: String,
      isPanelOpen: Boolean,
      postAdd: Function,
      onAddPanelClosing: Function
    },
    data: () => ({
      inputs: {
        name: ""
      },
      state
    }),
    methods: {
      closeSidebarPanel() {
        this.onAddPanelClosing()
      },
      save() {
        if (!this.inputs.name) {
          window.toastr.warning('Name can not be empty')
          return
        }
        if (this.state[this.collection][this.inputs.name]) {
          window.toastr.warning(`${this.entityTitle} with the name "${this.inputs.name}" already exists`)
          return
        }
        this.state.defaultUpsert(this.inputs, this.collection)
        this.postAdd(this.collection, this.inputs)
        this.inputs.name = ""
        this.closeSidebarPanel()
      }
    }
}
</script>
<style>
    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }

    .sidebar-backdrop {
        background-color: rgba(0,0,0,.7);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 2;
    }

    .sidebar-panel {
        overflow-y: auto;
        background-color: white;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        padding: 3rem 20px 2rem 20px;
        width: 400px;
    }
</style>