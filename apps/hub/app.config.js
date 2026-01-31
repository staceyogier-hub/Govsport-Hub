import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "Govsport Hub",
  slug: "govsport-hub",
  version: "1.0.0",
  orientation: "landscape",
  extra: {
    GOVSPORT_API_BASE_URL: process.env.GOVSPORT_API_BASE_URL ?? "https://api.govsport.local",
    HUB_DEVICE_ID: process.env.HUB_DEVICE_ID ?? ""
  }
});
