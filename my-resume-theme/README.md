See: http://jsonresume.org/

## Extra Stuff

You can define `meta.extras` in your JSON Resume with a few config options to do some override-type stuff without having to dig into this package's code.

### `meta.extras.layout`

You can see an example of this in `index.js` in the `LAYOUT_DEFAULT` variable.

Basically, you can use it to reorder the sections, or move them between containers.
You could even go wild and add new sections of your own, but the basics of `top`, `left`, `right`, and `bottom` are already there and CSS styled.

### `meta.extras.titles`

You can see an example of this in `index.js` in the `TITLES` variable.

This is a very simple map of section title strings to use.
For example, maybe you prefer "email" over "Email", or "Super Powers" instead of "Skills".
You should be able to override just the ones you want, and the rest will use the defaults.

### `meta.extras.customCSS`

Exactly what it sounds like.
Any additional CSS added here will be injected as appropriate.

### `meta.extras.images`

A map of images and their URLs:

```json5
{
  // For a network profile image, for example.
  "twitter": "data:...",
  // Or maybe action shots or whatever
  "me-being-awesome": "https://..."
}
```

Mostly this is just useful for adding network icons.

### `meta.extras.googleFontFamilyParam`

If you want to use a font other than Roboto Slab, get the `@import` URL from Google Fonts and extract its `family` URL parameter.
For example, the one I've used for Roboto Slab looks like `Roboto+Slab:wght@200;400`.

The alternative would be to just use `customCSS` to do your own `@import`, but that would leave the vestigial font loading and taking up bandwidth.

### `meta.extras.fontFamily`

Generally used with the previous param, this is the name of the font added to the CSS `font-family` list.
For example, `Roboto Slab`.
