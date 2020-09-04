<template>
  <div class="container mx-auto py-16 md:py-32 px-4">
    <h1 class="text-6xl leading-snug">
      Control
      <br />Shift
      <br />
      <span class="text-indigo-700 font-semibold">Escape</span>
    </h1>
    <div class="mt-32 border-t border-gray-400">
      <h3 class="text-2xl font-semibold text-indigo-700 font-serif mt-16 mb-4">About</h3>
      <p>
        Each room contains a series of small tasks, which will give clues
        for the final puzzle. Solving the final puzzle will give you the
        answer - enter it and escape before the time runs out!
      </p>
      <h3 class="text-2xl font-semibold text-indigo-700 font-serif mt-8 mb-4">Rooms</h3>
      <div class="block w-full">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div v-for="room in rooms" :key="room.id">
            <router-link :to="'/rooms/' + room.id">
              <alli-card class="h-24 flex items-center">
                <div class="text-center flex-1">
                  <p class="font-semibold text-lg">{{room.title}}</p>
                  <p class="text-sm text-gray-700">{{room.timeLimit}} minutes</p>
                </div>
              </alli-card>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      rooms: [],
    };
  },
  methods: {
    getRoomIds() {
      return require
        .context("../rooms/", true, /\.mdx$/)
        .keys()
        .map((k) =>
          k
            .substr(1)
            .replace(/\/index\.mdx$/, "")
            .replace("/", "")
        );
    },
    loadRooms() {
      var roomIds = this.getRoomIds();
      var roomList = [];

      roomIds.forEach((room) => {
        var roomData = require(`../rooms/${room}/index.mdx`);
        roomList.push({
          id: room,
          title: roomData.metadata.title,
          created: roomData.metadata.created,
          timeLimit: roomData.metadata.timeLimit,
        });
      });
      var sortedRooms = roomList.sort((a, b) =>
        a.created.localeCompare(b.created)
      );
      return sortedRooms;
    },
  },
  mounted() {
    var rooms = this.loadRooms();
    this.rooms = rooms;
  },
};
</script>
