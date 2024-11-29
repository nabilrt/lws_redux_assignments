const store = require("./rtk/store");
const {
  fetchInitialVideos,
  fetchTaggedVideos,
} = require("./rtk/feature/video/videoSlice");

store.subscribe(() => {});

store.dispatch(fetchInitialVideos()).then(() => {
  console.log(
    `INITIAL VIDEOS AFTER FETCHING ${JSON.stringify(store.getState())}`
  );
  const tags = store.getState().video.videos.tags;
  let updatedTagString = "";
  tags.forEach((element, idx, array) => {
    if (idx !== array.length - 1) {
      updatedTagString += "tags_like=" + element + "&";
    } else {
      updatedTagString += "tags_like=" + element;
    }
  });
  store.dispatch(fetchTaggedVideos(updatedTagString)).then(() => {
    console.log(`VIDEOS AFTER SORTING ${JSON.stringify(store.getState())}`);
  });
});
