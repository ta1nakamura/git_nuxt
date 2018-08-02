<template>
<div>
<h1>vue2-googlemap sample </h1>

<GmapMap
:center="{lng:100.52973,lat:13.904549}"
:zoom="15"
map-type-id="terrain"
style="width: 500px; height: 300px"
>
<GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
/>
</GmapMap>
</div>
</template>
<script>
export default {
  data() {
    return {
      markers: [
        {
          position: { lng: 100.52973, lat: 13.904549 }
        },
        {
          position: { lng: 100.527834, lat: 13.903676 }
        }
      ]
    };
  }
};
</script>

