<template>
    <b-row class="mainPanel">
      <b-col sm cols="2" class="sidecol bg-secondary">
        <b-nav vertical class="sidebar bg-secondary">
            <b-nav-item class="sidenav-link" to="">
                <b>Analytics</b>
            </b-nav-item>
            <b-nav-item class="sidenav-link" to="">
                <b>Profile</b>
            </b-nav-item>
            <b-nav-item class="sidenav-link" to="">
                <b>Users</b>
            </b-nav-item>
            <b-nav-item class="sidenav-link" to="">
                <b>Settings</b>
            </b-nav-item>
        </b-nav>
      </b-col>
      <b-col sm>
          <router-view></router-view>
      </b-col>
    </b-row>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import {useUserInfoStore} from "@/store"

    export default defineComponent({
        name: 'controlPanel',
        components: {

        },
        setup(){
            const userInfoStore = useUserInfoStore();
            return { userInfoStore }
        },
        methods:{
            logout(){
            this.userInfoStore.setToken("");
            this.userInfoStore.setExpiration(null);
            this.userInfoStore.setUser(null);
            this.$router.push("/");
            }
        }
    });
</script>
<style>

.sidebar{
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 15%;
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 56px; /* Stay at the top */
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
}
.nav-link{
    color: black;

}
.nav-link:hover .nav-link:focus {
    color: var(--bs-nav-link-hover-color);
}
@media only screen and (max-width: 296px) {
    .sidebar{
        top: 94px;
    }
}
</style>