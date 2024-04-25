import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyDno6v-E50a4gpxcn3mrKhk33ElYl5jfls",
  version: "weekly",
  libraries: ["places", "marker"],
});
export default loader;
