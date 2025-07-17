import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons"

module.exports = {
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["mdi", "heroicons"]),
    }),
  ],
}