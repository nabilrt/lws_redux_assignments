const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const videoReducer = require("./feature/video/videoSlice");

const logger = createLogger();

const store = configureStore({
  reducer: {
    video: videoReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;
