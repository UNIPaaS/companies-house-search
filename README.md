
# Companies house search component

An autocomplete search web-component for [Companies House API](https://developer.company-information.service.gov.uk/).

## How to install

#### Yarn

```
yarn add @unipaas/companies-house-component
```

#### NPM

```
npm install --save @unipaas/companies-house-component
```

## How to get an API Token

- Open an application for token [here](https://developer.company-information.service.gov.uk/manage-applications)

- Make sure! You register your domain otherwise the API will throw a CORS error. We recommend using tools such as [ngrok](https://ngrok.com/) for local development.

## Props

| Property    | Attribute   | Description | Type     | Default     |
| ----------- | ----------- | ----------- | -------- | ----------- |
| `token` | `token`             | `API Token` | `string` |
| `debounce`  | `debounce`  |    `Debouncing time (ms)`         | `number` | `600`       |
| `placeholder`  | `placeholder`  |    `Text input placeholder`         | `string` | `Search...`       |

---

## Events

| Event Name    | Description  |
| ----------- | ----------- |
| `businessSelected` | `Emitted when a business is selected`             |



